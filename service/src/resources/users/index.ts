import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { UsersService } from './service';
import { UsersController } from './controller';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
