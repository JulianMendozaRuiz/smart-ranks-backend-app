import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverActiveMessage(): string {
    return 'The server is active and running';
  }
}
