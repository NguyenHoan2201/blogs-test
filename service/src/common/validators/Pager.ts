import { Type, Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class Pager {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Transform(({ value }) => value ?? 0)
  base?: number = 0;

  @Type(() => Number)
  @IsInt()
  @Min(25)
  @Max(100)
  @Transform(({ value }) => value ?? 25)
  limit?: number = 25;
}
