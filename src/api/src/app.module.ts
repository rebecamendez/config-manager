import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigManagerModule } from './modules/config-manager/config-manager.module';
import { RootModule } from './modules/root/root.module';
import { HttpLoggerMiddleware } from 'middlewares/http-logger/http-logger.middleware';
import { AddContextMiddleware } from 'middlewares/add-context/add-context.middleware';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
    }),
    RootModule,
    ConfigManagerModule
  ]
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AddContextMiddleware).forRoutes('*');
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
