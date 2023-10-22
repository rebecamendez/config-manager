import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  public readonly PORT: number = 3000;

  @IsOptional()
  @IsString()
  public readonly DB_HOST: string;

  @IsOptional()
  @IsNumber()
  public readonly DB_PORT: number;

  @IsOptional()
  @IsString()
  public readonly DB_USER: string;

  @IsOptional()
  @IsString()
  public readonly DB_PASSWORD: string;

  @IsOptional()
  @IsString()
  public readonly DB_DATABASE: string;

  @IsOptional()
  @IsBoolean()
  public readonly DB_ENABLE_LOGGER: boolean = false;
}

export const validate = (config: Record<string, unknown>): EnvironmentVariables => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true, excludeExtraneousValues: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
