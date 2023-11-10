import { ConfigurationEntity } from 'modules/shared/database/entities/configuration.entity';
import { Configuration } from '../domain/configuration';
import { ConfigurationsRepository } from './configurations.repository';
import { ConfigurationEntityMapper } from './mappers/configuration-entity.mapper';
import { DataSource } from 'typeorm';

export class ConfigurationsRepositoryDb implements ConfigurationsRepository {
  public constructor(private readonly dataSource: DataSource) {}
  public async getConfigurations(): Promise<Configuration[]> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    const configurations = await configurationsRepository.find({
      order: { key: 'ASC' }
    });
    return configurations.map(ConfigurationEntityMapper.toDomain);
  }
}
