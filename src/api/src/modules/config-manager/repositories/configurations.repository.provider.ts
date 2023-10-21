import { ConfigurationsRepositoryDb } from './configurations.repository.db';

export const CONFIGURATIONS_REPOSITORY = 'CONFIGURATIONS_REPOSITORY';

export const configurationsRepositoryProviders = [
  {
    provide: CONFIGURATIONS_REPOSITORY,
    useClass: ConfigurationsRepositoryDb
  }
];
