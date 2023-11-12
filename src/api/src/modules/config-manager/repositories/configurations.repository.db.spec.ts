import { DataSource } from 'typeorm';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { ConfigurationsRepositoryDb } from './configurations.repository.db';
import { createMockedConfiguration } from '../tests/mocks/configurations.mocks';
import { EntityNotFoundError } from 'modules/shared/database/errors/entity-already-exists.error';
import { EntityAlreadyExistsError } from 'modules/shared/database/errors/entity-not-found.error copy';

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

  it('should get a configuration using the repository', async () => {
    const result = await repository.getConfiguration('my-config');
    expect(result).toMatchSnapshot();
  });

  it('should throw an error trying to retrieve a not existent configuration using the repository', async () => {
    await expect(async () => {
      await repository.getConfiguration('my-configNotFound');
    }).rejects.toThrow(new EntityNotFoundError('Configuration with key: my-configNotFound not found'));
  });

  it('should create a configuration using the repository', async () => {
    const configuration = createMockedConfiguration();
    const result = await repository.createConfiguration(configuration);
    expect(result).toMatchSnapshot();
  });

  it('should throw an error trying to create a existent key configuration using the repository', async () => {
    const configuration = createMockedConfiguration({ key: 'my-config' });
    await expect(async () => {
      await repository.createConfiguration(configuration);
    }).rejects.toThrow(new EntityAlreadyExistsError('Configuration with key: my-config already exists'));
  });

  it('should update a configuration using the repository', async () => {
    const key = 'my-config';
    const configuration = createMockedConfiguration({ key, value: 'updated value' });
    const result = await repository.updateConfiguration(key, configuration);
    expect(result).toMatchSnapshot();
  });

  it('should throw an error trying to upate a non existent configuration using the repository', async () => {
    const key = 'my-config-not-found';
    const configuration = createMockedConfiguration({ key, value: 'updated value' });
    await expect(async () => {
      await repository.updateConfiguration(key, configuration);
    }).rejects.toThrow(new EntityAlreadyExistsError('Configuration with key: my-config-not-found not found'));
  });

  it('should remove a configuration using the repository', async () => {
    const key = 'my-config';
    await repository.deleteConfiguration(key);

    await expect(async () => {
      await repository.getConfiguration(key);
    }).rejects.toThrow(new EntityNotFoundError('Configuration with key: my-config not found'));
  });
});
