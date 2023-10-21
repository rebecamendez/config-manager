import { DATA_SOURCE } from 'modules/shared/database/database.providers';
import { DataSource } from 'typeorm';
import { ConfigurationsRepository } from './configurations.repository';
import { ConfigurationsRepositoryDb } from './configurations.repository.db';

export const CONFIGURATIONS_REPOSITORY = 'CONFIGURATIONS_REPOSITORY';

export const configurationsRepositoryProviders = [
  {
    provide: CONFIGURATIONS_REPOSITORY,
    useFactory: (dataSource: DataSource): ConfigurationsRepository => new ConfigurationsRepositoryDb(dataSource),
    inject: [DATA_SOURCE]
  }
];
