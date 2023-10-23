import { mock, mockReset } from 'jest-mock-extended';
import { GracefulShutdownService } from './graceful-shutdown.service';
import { DataSource } from 'typeorm';

describe('A Graceful Shutdown service', () => {
  const datasource = mock<DataSource>();
  const service = new GracefulShutdownService(datasource);

  beforeEach(() => {
    mockReset(datasource);
  });

  it('should call to close all database conections on shutdown event', async () => {
    await service.onApplicationShutdown();
    expect(datasource.destroy).toBeCalled();
  });
});
