import { Configuration } from "../domain/configuration";

export interface ConfigurationsRepository {
    getConfigurations(): Promise<Configuration[]>;
  }
