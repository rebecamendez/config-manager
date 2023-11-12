import { Configuration } from '../domain/configuration';

export interface ConfigurationsRepository {
  getConfigurations(): Promise<Configuration[]>;
  getConfiguration(key: string): Promise<Configuration>;
  createConfiguration(createCommand: Configuration): Promise<Configuration>;
}
