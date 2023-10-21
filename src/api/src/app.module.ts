import { Module } from '@nestjs/common';
import { ConfigManagerModule } from './modules/config-manager/config-manager.module';
import { RootModule } from './modules/root/root.module';

@Module({
  imports: [RootModule, ConfigManagerModule],
})
export class AppModule {}
