import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class IsMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid MongoId provided');
    }
    return value;
  }
}
