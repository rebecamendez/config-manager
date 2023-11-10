import { ConfigurationRequest } from 'api-contract/configuration.request';
import { Configuration } from '../../domain/configuration';

export class ConfigurationRequestMapper {
  public static toDomain(request: ConfigurationRequest): Configuration {
    const command = new Configuration(request.key, request.value);
    return command;
  }
}
