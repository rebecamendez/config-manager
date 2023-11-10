import { ConfigurationResponse } from 'api-contract/configuration.response';
import { Configuration } from '../../domain/configuration';

export const createMockedConfiguration = (customValues?: Partial<Configuration>): Configuration => {
  const name = customValues?.key || 'foo';
  const value = customValues?.value || 'bar';
  return new Configuration(name, value);
};

export const createMockedConfigurationResponse = (customValues?: Partial<ConfigurationResponse>): ConfigurationResponse => {
  const configuration = new ConfigurationResponse();
  configuration.key = customValues?.key || 'foo';
  configuration.value = customValues?.value || 'bar';
  return configuration;
};
