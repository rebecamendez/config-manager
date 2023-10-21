import { Module } from '@nestjs/common';
import { databaseProviders, DATA_SOURCE } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [DATA_SOURCE]
})
export class DatabaseModule {}
