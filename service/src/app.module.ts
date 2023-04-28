import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/modules/auth/guard';
import { BlogsModule } from './resources/blogs';
import { UsersModule } from './resources/users';

@Module({
  imports: [BlogsModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
