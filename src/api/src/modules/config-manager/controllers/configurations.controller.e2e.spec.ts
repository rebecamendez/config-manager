import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { setupNestApp } from '../../../main.setup';

describe('A Configurations controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    setupNestApp(app); // https://stackoverflow.com/questions/59355841/how-to-apply-global-pipes-during-e2e-tests
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('should return configurations', async () => {
    const response = await request(app.getHttpServer()).get('/configurations').send();
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });
});
