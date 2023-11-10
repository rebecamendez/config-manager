import { DataSource } from 'typeorm';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { ConfigurationsRepositoryDb } from './configurations.repository.db';
import { createMockedConfiguration } from '../tests/mocks/configurations.mocks';

describe('A Configurations db repository', () => {
  let dataSource: DataSource;
  let container: StartedTestContainer;
  let repository: ConfigurationsRepositoryDb;

  beforeAll(async () => {
    const databaseName = 'configuration-repository-test';
    const entities = [__dirname + './../../shared/database/entities/**/*.entity.ts'];

    container = await new GenericContainer('postgres')
      .withEnvironment({ POSTGRES_USER: 'the-user', POSTGRES_PASSWORD: 'the-password', POSTGRES_DB: databaseName })
      .withExposedPorts(5432)
      .withCopyFilesToContainer([{ source: 'init.sql', target: '/docker-entrypoint-initdb.d/init.sql' }])
      .withName(databaseName)
      .start();

    dataSource = new DataSource({
      type: 'postgres',
      host: container.getHost(),
      port: container.getMappedPort(5432),
      username: 'the-user',
      password: 'the-password',
      database: databaseName,
      entities,
      migrations: [],
      synchronize: false,
      logging: false
    });

    await dataSource.initialize();
    repository = new ConfigurationsRepositoryDb(dataSource);
  });

  afterAll(async () => {
    if (dataSource) {
      await dataSource.destroy();
    }
    if (container) {
      await container.stop();
    }
  });

  it('should get the configurations using the repository', async () => {
    const result = await repository.getConfigurations();
    expect(result).toMatchSnapshot();
  });

  it('should create a configuration using the repository', async () => {
    const configuration = createMockedConfiguration();
    const result = await repository.createConfiguration(configuration);
    expect(result).toMatchSnapshot();
  });
});
