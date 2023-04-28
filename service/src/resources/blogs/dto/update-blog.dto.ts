import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  thumImg?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  shortContent?: string;
}
