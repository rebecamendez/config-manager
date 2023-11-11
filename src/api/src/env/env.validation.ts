import { Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @Expose()
  @IsNumber()
  public readonly PORT: number;

  @Expose()
  @IsString()
  public readonly DB_HOST: string;

  @Expose()
  @IsNumber()
  public readonly DB_PORT: number;

  @Expose()
  @IsString()
  public readonly DB_USER: string;

  @Expose()
  @IsString()
  public readonly DB_PASSWORD: string;

  @Expose()
  @IsString()
  public readonly DB_DATABASE: string;

  @Expose()
  @IsBoolean()
  public readonly DB_ENABLE_LOGGER: boolean;
}

export const validate = (config: Record<string, unknown>): EnvironmentVariables => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) throw new Error(errors.toString());
  return validatedConfig;
};
