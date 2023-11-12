import { ConfigurationEntity } from 'modules/shared/database/entities/configuration.entity';
import { Configuration } from '../domain/configuration';
import { ConfigurationsRepository } from './configurations.repository';
import { ConfigurationEntityMapper } from './mappers/configuration-entity.mapper';
import { DataSource } from 'typeorm';

export class ConfigurationsRepositoryDb implements ConfigurationsRepository {
  public constructor(private readonly dataSource: DataSource) {}
  public async getConfigurations(): Promise<Configuration[]> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    const configurationsEntity = await configurationsRepository.find({
      order: { key: 'ASC' }
    });
    return configurationsEntity.map(ConfigurationEntityMapper.toDomain);
  }

  public async getConfiguration(key: string): Promise<Configuration> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    const configurationEntity = await configurationsRepository.findOneOrFail({ where: { key } });
    return ConfigurationEntityMapper.toDomain(configurationEntity);
  }

  public async createConfiguration(createCommand: Configuration): Promise<Configuration> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    const configurationEntity = await configurationsRepository.create(createCommand);
    const configurationPersistentEntity = await configurationsRepository.save(configurationEntity);
    return ConfigurationEntityMapper.toDomain(configurationPersistentEntity);
  }
}
