import { Module } from '@nestjs/common';
import { ConfigurationsController } from './controllers/configurations.controller';
import { ConfigurationsService } from './services/configurations.service';
import { configurationsRepositoryProviders } from './repositories/configurations.repository.provider';

@Module({
  controllers: [ConfigurationsController],
  imports: [],
  providers: [ConfigurationsService, ...configurationsRepositoryProviders]
})
export class ConfigManagerModule {}
