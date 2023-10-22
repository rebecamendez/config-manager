import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'app.module';
import * as request from 'supertest';
import { setupNestApp } from '../../main.setup';
import { DATA_SOURCE } from 'modules/shared/database/database.providers';
import { StartedTestContainer, GenericContainer } from 'testcontainers';
import { DataSource } from 'typeorm';

describe('A Root controller (e2e)', () => {
  let app: INestApplication;
  let container: StartedTestContainer;

  beforeAll(async () => {
    const databaseName = 'root-controller-e2e-test';
    const entities = [__dirname + './../../shared/database/entities/**/*.entity.ts'];

    container = await new GenericContainer('postgres')
      .withEnvironment({ POSTGRES_USER: 'the-user', POSTGRES_PASSWORD: 'the-password', POSTGRES_DB: databaseName })
      .withExposedPorts(5432)
      .withCopyFilesToContainer([{ source: 'init.sql', target: '/docker-entrypoint-initdb.d/init.sql' }])
      .withName(databaseName)
      .start();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(DATA_SOURCE)
      .useFactory({
        factory: async () => {
          const datasourceConfig = new DataSource({
            type: 'postgres',
            host: container.getHost(),
            port: container.getMappedPort(5432),
            username: 'the-user',
            password: 'the-password',
            database: databaseName,
            entities,
            migrations: [],
            migrationsRun: false,
            synchronize: false,
            logging: false
          });
          return datasourceConfig.initialize();
        }
      })
      .compile();

    app = moduleFixture.createNestApplication();
    setupNestApp(app);
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    if (container) await container.stop();
  });

  it('should return a Hello World', async () => {
    const response = await request(app.getHttpServer()).get('/').send();
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
