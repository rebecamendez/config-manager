import { ConfigurationEntity } from 'modules/shared/database/entities/configuration.entity';
import { Configuration } from '../domain/configuration';
import { ConfigurationsRepository } from './configurations.repository';
import { ConfigurationEntityMapper } from './mappers/configuration-entity.mapper';
import { DataSource } from 'typeorm';
import { EntityNotFoundError } from 'modules/shared/database/errors/entity-already-exists.error';
import { EntityAlreadyExistsError } from 'modules/shared/database/errors/entity-not-found.error copy';

export class ConfigurationsRepositoryDb implements ConfigurationsRepository {
  public constructor(private readonly dataSource: DataSource) {}

  public async getConfigurations(): Promise<Configuration[]> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    const configurationsEntity = await configurationsRepository.find({ order: { key: 'ASC' } });
    return configurationsEntity.map(ConfigurationEntityMapper.toDomain);
  }

  public async getConfiguration(key: string): Promise<Configuration> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    const configurationEntity = await configurationsRepository.findOne({ where: { key } });

    if (!configurationEntity) throw new EntityNotFoundError(`Configuration with key: ${key} not found`);
    return ConfigurationEntityMapper.toDomain(configurationEntity);
  }

  public async createConfiguration(createCommand: Configuration): Promise<Configuration> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    const foundConfigurationEntity = await configurationsRepository.findOne({ where: { key: createCommand.key } });

    if (foundConfigurationEntity) {
      throw new EntityAlreadyExistsError(`Configuration with key: ${createCommand.key} already exists`);
    }

    const configurationEntity = await configurationsRepository.create(createCommand);
    const configurationPersistentEntity = await configurationsRepository.save(configurationEntity);
    return ConfigurationEntityMapper.toDomain(configurationPersistentEntity);
  }

  public async updateConfiguration(key: string, createCommand: Configuration): Promise<Configuration> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    const foundConfigurationEntity = await configurationsRepository.findOne({ where: { key } });

    if (!foundConfigurationEntity) throw new EntityNotFoundError(`Configuration with key: ${key} not found`);

    const configurationEntity = await configurationsRepository.create(createCommand);
    const configurationPersistentEntity = await configurationsRepository.save(configurationEntity);
    return ConfigurationEntityMapper.toDomain(configurationPersistentEntity);
  }

  public async deleteConfiguration(key: string): Promise<void> {
    const configurationsRepository = this.dataSource.getRepository(ConfigurationEntity);
    await configurationsRepository.delete({ key });
  }
}
