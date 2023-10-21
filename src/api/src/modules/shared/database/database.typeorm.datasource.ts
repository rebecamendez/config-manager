import { DataSource } from 'typeorm';

// https://stackoverflow.com/questions/61259812/cannot-use-import-statement-outside-a-module-in-typeorm-migration-when-run-nes
export const typeormDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'config_manager_db',
  entities: [__dirname + '/entities/**/*.entity.ts'],
  migrations: ['./dist/src/migrations/**/*.js'],
  migrationsRun: false,
  synchronize: false,
  logging: true
});
