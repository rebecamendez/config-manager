import { Module } from '@nestjs/common';
import { DatabaseModule } from 'modules/shared/database/database.module';
import { GracefulShutdownService } from './graceful-shutdown.service';

@Module({
  exports: [GracefulShutdownService],
  imports: [DatabaseModule],
  providers: [GracefulShutdownService]
})
export class GracefulShutdownModule {}
