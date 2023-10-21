import { ConfigurationsRepositoryDb } from './configurations.repository.db';

describe('A Configurations db repository', () => {
  const repository = new ConfigurationsRepositoryDb();

  it('should get the configurations using the repository', async () => {
    const result = await repository.getConfigurations();
    expect(result).toMatchSnapshot();
  });
});
