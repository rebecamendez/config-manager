import { Inject, Injectable } from '@nestjs/common';
import { Configuration } from '../domain/configuration';
import { CONFIGURATIONS_REPOSITORY } from '../repositories/configurations.repository.provider';
import { ConfigurationsRepository } from '../repositories/configurations.repository';

@Injectable()
export class ConfigurationsService {
  public constructor(@Inject(CONFIGURATIONS_REPOSITORY) private readonly configurationsRepository: ConfigurationsRepository) {}
  public async getConfigurations(): Promise<Configuration[]> {
    return this.configurationsRepository.getConfigurations();
  }

  public async getConfiguration(key: string): Promise<Configuration> {
    return this.configurationsRepository.getConfiguration(key);
  }

  public async createConfiguration(createCommand: Configuration): Promise<Configuration> {
    return this.configurationsRepository.createConfiguration(createCommand);
  }

  // TODO: verify key is the same in updateCommand or remove key from command
  public async updateConfiguration(key: string, updateCommand: Configuration): Promise<Configuration> {
    return this.configurationsRepository.updateConfiguration(key, updateCommand);
  }

  public async deleteConfiguration(key: string): Promise<void> {
    await this.configurationsRepository.deleteConfiguration(key);
  }
}
