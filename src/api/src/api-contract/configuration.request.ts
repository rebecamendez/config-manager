import { IsString, MaxLength, Matches } from 'class-validator';

export class ConfigurationRequest {
  @IsString()
  @MaxLength(255)
  @Matches(/^[a-z0-9-]*$/)
  public key: string;

  @IsString()
  @MaxLength(1000)
  public value: string;
}
