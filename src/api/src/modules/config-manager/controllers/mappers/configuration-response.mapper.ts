import { ConfigurationResponse } from 'api-contract/configuration.response';
import { Configuration } from '../../domain/configuration';

export class ConfigurationsResponseMapper {
  public static toResponse(configuration: Configuration): ConfigurationResponse {
    const response = new ConfigurationResponse();
    response.name = configuration.name;
    response.value = configuration.value;
    return response;
  }
}
