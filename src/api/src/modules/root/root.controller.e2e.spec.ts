import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'app.module';
import * as request from 'supertest';
import { setupNestApp } from '../../main.setup';

describe('A Root controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    setupNestApp(app);
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('should return a Hello World', async () => {
    const response = await request(app.getHttpServer()).get('/').send();
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
