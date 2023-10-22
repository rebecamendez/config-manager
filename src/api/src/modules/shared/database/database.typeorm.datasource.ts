import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

// https://stackoverflow.com/questions/61259812/cannot-use-import-statement-outside-a-module-in-typeorm-migration-when-run-nes
export const typeormDataSource = new DataSource({
  type: 'postgres',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: 5432,
  username: configService.getOrThrow<string>('DB_USER'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_DATABASE'),
  entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
  migrations: ['./dist/src/migrations/**/*.js'],
  migrationsRun: false,
  synchronize: false,
  logging: configService.getOrThrow<boolean>('DB_ENABLE_LOGGER')
});
