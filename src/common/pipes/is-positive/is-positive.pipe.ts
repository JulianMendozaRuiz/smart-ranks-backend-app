/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IsPositivePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value <= 0) {
      throw new BadRequestException('The value must be a positive number');
    }
    return value;
  }
}
