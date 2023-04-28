import { IsUUID } from 'class-validator';

export class FindById {
  @IsUUID()
  id: string;
}
