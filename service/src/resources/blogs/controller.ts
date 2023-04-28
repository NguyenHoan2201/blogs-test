import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogsService } from './service';
import { SearchBlogDto } from './dto/search-blog.dto';
import { FindById } from './dto/find-by-id.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { REQUEST } from '@nestjs/core';
import { DecoratedFastifyRequest } from 'src/common/interfaces/request';
import { AllowUnauthenticatedRequest } from 'src/common/modules/auth/guard';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    @Inject(REQUEST) private request: DecoratedFastifyRequest,
  ) {}

  @AllowUnauthenticatedRequest()
  @Get()
  async find(@Query() query: SearchBlogDto) {
    return this.blogsService.find(query);
  }
  @Get('/of-mine')
  async findMineBlogs(@Query() query: SearchBlogDto) {
    return this.blogsService.find(query, this.request.raw.user?.id);
  }

  @AllowUnauthenticatedRequest()
  @Get(':id')
  async getById(@Param() { id }: FindById) {
    return this.blogsService.getById(id);
  }
  @Post()
  async create(@Body() data: CreateBlogDto) {
    return this.blogsService.create(data);
  }
  @Put()
  async update(@Body() body: UpdateBlogDto, @Param() { id }: FindById) {
    return this.blogsService.update(id, body);
  }
  @Delete()
  async delete(@Param() { id }: FindById) {
    return this.blogsService.delete(id);
  }
}
