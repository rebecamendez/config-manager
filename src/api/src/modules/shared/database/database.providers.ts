import { DataSource } from 'typeorm';
import { typeormDataSource } from './database.typeorm.datasource';

export const DATA_SOURCE = 'DATA_SOURCE';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (): Promise<DataSource> => {
      return typeormDataSource.initialize();
    }
  }
];
