import { Configuration } from '../../domain/configuration';
import { ConfigurationEntity } from '../entities/configuration.entity';

export class ConfigurationEntityMapper {
  public static toDomain(entity: ConfigurationEntity): Configuration {
    return new Configuration(entity.name, entity.value);
  }
}
