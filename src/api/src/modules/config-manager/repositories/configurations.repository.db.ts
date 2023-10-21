import { Configuration } from '../domain/configuration';
import { ConfigurationsRepository } from './configurations.repository';
import { ConfigurationEntity } from './entities/configuration.entity';
import { ConfigurationEntityMapper } from './mappers/configuration-entity.mapper';

// TODO: implement database connection
export class ConfigurationsRepositoryDb implements ConfigurationsRepository {
  public constructor() {}
  public async getConfigurations(): Promise<Configuration[]> {
    const entity = new ConfigurationEntity();
    entity.name = 'foo';
    entity.value = 'bar';
    const entities = [entity];
    return entities.map(ConfigurationEntityMapper.toDomain);
  }
}
