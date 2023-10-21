import { Inject, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { DATA_SOURCE } from 'modules/shared/database/database.providers';
import { DataSource } from 'typeorm';

@Injectable()
export class GracefulShutdownService implements OnApplicationShutdown {
  public constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {}

  public async onApplicationShutdown(signal?: string): Promise<void> {
    await Promise.all([this.shutdownDatabaseConnection()]);
  }

  private async shutdownDatabaseConnection(): Promise<void> {
    Logger.log('[GracefulShutdown] Shutting down database connections ...');
    await this.dataSource.destroy();
    Logger.log('[GracefulShutdown] Database connections closed');
  }
}
