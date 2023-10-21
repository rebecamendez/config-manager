import { Controller, Get } from '@nestjs/common';
import { ConfigurationsService } from '../services/configurations.service';
import { ConfigurationResponse } from 'api-contract/configuration.response';
import { ConfigurationsResponseMapper } from './mappers/configuration-response.mapper';

@Controller('/configurations')
export class ConfigurationsController {
  public constructor(private readonly configurationService: ConfigurationsService) {}

  @Get()
  public async getConfigurations(): Promise<ConfigurationResponse[]> {
    const configurations = await this.configurationService.getConfigurations();
    return configurations.map(ConfigurationsResponseMapper.toResponse);
  }
}
