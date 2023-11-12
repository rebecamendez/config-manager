import { mock, mockReset } from 'jest-mock-extended';
import { ConfigurationsService } from './configurations.service';
import { createMockedConfiguration } from '../tests/mocks/configurations.mocks';
import { ConfigurationsRepository } from '../repositories/configurations.repository';

describe('A Configurations service', () => {
  const configurationsRepository = mock<ConfigurationsRepository>();
  const service = new ConfigurationsService(configurationsRepository);

  beforeEach(() => {
    mockReset(configurationsRepository);
  });

  it('should get the configurations using the repository', async () => {
    const expectedConfigurations = [createMockedConfiguration()];

    configurationsRepository.getConfigurations.calledWith().mockResolvedValue(expectedConfigurations);

    const result = await service.getConfigurations();

    expect(result).toStrictEqual(expectedConfigurations);
  });

  it('should get a configuration using the repository', async () => {
    const key = 'myKey';
    const expectedConfiguration = createMockedConfiguration({ key });

    configurationsRepository.getConfiguration.calledWith(key).mockResolvedValue(expectedConfiguration);

    const result = await service.getConfiguration(key);

    expect(result).toStrictEqual(expectedConfiguration);
  });

  it('should create a configurations using the repository', async () => {
    const configuration = createMockedConfiguration();

    configurationsRepository.createConfiguration.calledWith(configuration).mockResolvedValue(configuration);

    const result = await service.createConfiguration(configuration);
    expect(result).toStrictEqual(configuration);
  });

  it('should delete a configuration using the repository', async () => {
    const key = 'myKey';

    configurationsRepository.deleteConfiguration.calledWith(key).mockResolvedValue(undefined);

    await service.deleteConfiguration(key);

    expect(configurationsRepository.deleteConfiguration).toHaveBeenCalledWith(key);
  });
});
