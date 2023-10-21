import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service';

@Controller('/')
export class RootController {
  public constructor(private readonly rootService: RootService) {}

  @Get()
  public getHello(): string {
    const response = this.rootService.getHello();
    return response;
  }
}
