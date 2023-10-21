import { Module } from '@nestjs/common';
import { ConfigurationsController } from './controllers/configurations.controller';
import { ConfigurationsService } from './services/configurations.service';
import { configurationsRepositoryProviders } from './repositories/configurations.repository.provider';
import { DatabaseModule } from 'modules/shared/database/database.module';

@Module({
  controllers: [ConfigurationsController],
  imports: [DatabaseModule],
  providers: [ConfigurationsService, ...configurationsRepositoryProviders]
})
export class ConfigManagerModule {}
