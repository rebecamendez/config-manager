import { ConfigurationResponse } from 'api-contract/configuration.response';
import { Configuration } from '../../domain/configuration';

export const createMockedConfiguration = (customValues?: Partial<Configuration>): Configuration => {
  const key = customValues?.key || 'foo';
  const value = customValues?.value || 'bar';
  return new Configuration(key, value);
};

export const createMockedConfigurationResponse = (customValues?: Partial<ConfigurationResponse>): ConfigurationResponse => {
  const configuration = new ConfigurationResponse();
  configuration.key = customValues?.key || 'foo';
  configuration.value = customValues?.value || 'bar';
  return configuration;
};
