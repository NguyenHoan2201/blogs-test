import { Module } from '@nestjs/common';
import { BlogsController } from './controller';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { BlogsService } from './service';

@Module({
  controllers: [BlogsController],
  providers: [PrismaService, BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}
