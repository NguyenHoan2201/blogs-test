import { NotFoundException } from '@nestjs/common';
import { PrismaModels } from '../constant/prismaModels';

export class notFoundException extends NotFoundException {
  constructor(modelName: PrismaModels, id: string) {
    super(`${modelName} with id ${id} not found`);
  }
}
