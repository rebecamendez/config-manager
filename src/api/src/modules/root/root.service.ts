import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  public getHello(): string {
    return 'Hello World!';
  }
}
