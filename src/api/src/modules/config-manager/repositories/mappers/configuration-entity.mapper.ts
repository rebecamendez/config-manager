import { ConfigurationEntity } from 'modules/shared/database/entities/configuration.entity';
import { Configuration } from '../../domain/configuration';

export class ConfigurationEntityMapper {
  public static toDomain(entity: ConfigurationEntity): Configuration {
    return new Configuration(entity.key, entity.value);
  }
}
