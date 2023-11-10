import { mock, mockReset } from 'jest-mock-extended';
import { ConfigurationsService } from '../services/configurations.service';
import { createMockedConfiguration, createMockedConfigurationResponse } from '../tests/mocks/configurations.mocks';
import { ConfigurationsController } from './configurations.controller';

describe('A Configurations controller', () => {
  const configurationsService = mock<ConfigurationsService>();
  const controller = new ConfigurationsController(configurationsService);

  beforeEach(() => {
    mockReset(configurationsService);
  });

  it('should get the configurations using the service', async () => {
    const expectedConfigurations = [createMockedConfiguration()];
    const expectedConfigurationsResponse = [createMockedConfigurationResponse()];

    configurationsService.getConfigurations.calledWith().mockResolvedValue(expectedConfigurations);

    const result = await controller.getConfigurations();

    expect(result).toMatchObject(expectedConfigurationsResponse);
  });

  it('should create a configuration using the service', async () => {
    const configuration = createMockedConfiguration();
    const expectedConfigurationsResponse = createMockedConfigurationResponse();

    configurationsService.createConfiguration.calledWith(expect.objectContaining(configuration)).mockResolvedValue(configuration);

    const result = await controller.createConfiguration(configuration);

    expect(result).toMatchObject(expectedConfigurationsResponse);
  });
});
