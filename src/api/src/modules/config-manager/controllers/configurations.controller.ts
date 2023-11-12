import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigurationsService } from '../services/configurations.service';
import { ConfigurationResponse } from 'api-contract/configuration.response';
import { ConfigurationResponseMapper } from './mappers/configuration-response.mapper';
import { ApiTags } from '@nestjs/swagger';
import { ConfigurationRequest } from 'api-contract/configuration.request';
import { ConfigurationRequestMapper } from './mappers/configuration-request.mapper';

@ApiTags('configurations')
@Controller('/configurations')
export class ConfigurationsController {
  public constructor(private readonly configurationService: ConfigurationsService) {}

  @Get()
  public async getConfigurations(): Promise<ConfigurationResponse[]> {
    const configurations = await this.configurationService.getConfigurations();
    return configurations.map(ConfigurationResponseMapper.toResponse);
  }

  @Get('/:key')
  public async getConfiguration(@Param('key') key: string): Promise<ConfigurationResponse> {
    const configuration = await this.configurationService.getConfiguration(key);
    return ConfigurationResponseMapper.toResponse(configuration);
  }

  @Post()
  public async createConfiguration(@Body() createRequest: ConfigurationRequest): Promise<ConfigurationResponse> {
    const createCommand = ConfigurationRequestMapper.toDomain(createRequest);
    const configuration = await this.configurationService.createConfiguration(createCommand);
    return ConfigurationResponseMapper.toResponse(configuration);
  }
}
