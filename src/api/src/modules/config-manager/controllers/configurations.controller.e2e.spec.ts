/* eslint-disable no-process-env */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { setupNestApp } from '../../../main.setup';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { DATA_SOURCE } from 'modules/shared/database/database.providers';
import { DataSource } from 'typeorm';
import { createMockedConfiguration } from '../tests/mocks/configurations.mocks';

describe('A Configurations controller (e2e)', () => {
  let app: INestApplication;
  let container: StartedTestContainer;

  beforeAll(async () => {
    const databaseName = 'configurations-controller-e2e-test';
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
            entities: entities,
            migrations: ['./dist/src/migrations/**/*.js'],
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

  it('should return configurations', async () => {
    const response = await request(app.getHttpServer()).get('/configurations').send();
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });

  it('should create a configuration', async () => {
    const configuration = createMockedConfiguration();
    const response = await request(app.getHttpServer()).post('/configurations').send(configuration);
    expect(response.status).toBe(201);
    expect(response.body).toMatchSnapshot();
  });
});
