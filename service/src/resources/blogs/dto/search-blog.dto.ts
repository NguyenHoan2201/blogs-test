import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Pager } from 'src/common/validators/Pager';
const sortOptions = ['createdAt'];
const orderByOptions = ['desc', 'asc'];

export class SearchBlogDto extends Pager {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  author?: string;

  @IsOptional()
  @IsString()
  @IsIn(sortOptions)
  sortBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(orderByOptions)
  orderBy?: string;
}
