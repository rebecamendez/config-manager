import 'reflect-metadata';
import { validate } from 'env/env.validation';

describe('An environment variables validation', () => {
  const mockEnv = {
    PORT: 3000,
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_USER: 'root',
    DB_PASSWORD: 'password',
    DB_DATABASE: 'config_manager_db',
    DB_ENABLE_LOGGER: true
  };

  it('should return env variables', async () => {
    const env = validate(mockEnv);
    expect(env).toMatchSnapshot();
  });

  it('should throw an error if has validation issues', async () => {
    expect(() => validate({})).toThrow(Error);
  });
});
