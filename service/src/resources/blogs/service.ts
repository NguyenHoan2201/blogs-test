import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { SearchBlogDto } from './dto/search-blog.dto';
import { notFoundException } from 'src/common/exceptions/notFoundException';
import { PrismaModels } from 'src/common/constant/prismaModels';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { REQUEST } from '@nestjs/core';
import { DecoratedFastifyRequest } from 'src/common/interfaces/request';

@Injectable()
export class BlogsService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private request: DecoratedFastifyRequest,
  ) {}

  async find(
    { author, base, limit, orderBy, sortBy, title }: SearchBlogDto,
    userId?: string,
  ) {
    const sortOptions = sortBy ? { [sortBy]: orderBy || 'desc' } : {};
    const and: any[] = [];
    const or: any[] = [];
    const conditions: Record<string, any> = {};
    if (author) {
      and.push({ author: author });
    }
    if (title) {
      or.push({
        title: {
          search: title.split(' ').join(' & '),
        },
      });
      or.push({
        shortContent: {
          search: title.split(' ').join(' & '),
        },
      });
      or.push({
        content: {
          search: title.split(' ').join(' & '),
        },
      });
    }
    if (userId) {
      and.push({
        createdBy: userId,
      });
    }

    if (and.length) {
      conditions.AND = and;
    }
    if (or.length) {
      conditions.OR = or;
    }
    const [data, count] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        skip: base,
        take: limit,
        where: conditions,
        orderBy: sortOptions,
        select: {
          id: true,
          title: true,
          thumImg: true,
          shortContent: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              displayName: true,
            },
          },
        },
      }),
      this.prisma.blog.count({
        where: conditions,
      }),
    ]);
    return {
      data: data.map((x) => ({ ...x, createdBy: x.author.displayName })),
      count,
    };
  }

  async getById(id: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });
    if (!blog) {
      throw new notFoundException(PrismaModels.Blog, id);
    }
    return blog;
  }

  async create(createBlogDto: CreateBlogDto) {
    const userId = this.request.raw.user.id;
    return this.prisma.blog.create({
      data: {
        ...createBlogDto,
        author: { connect: { id: userId } },
      },
    });
  }
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: { id },
      data: {
        ...updateBlogDto,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.blog.delete({
      where: { id },
    });
  }
}
