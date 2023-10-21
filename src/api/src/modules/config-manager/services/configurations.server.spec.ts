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
});
