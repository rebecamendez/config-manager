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
}
