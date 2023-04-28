import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from './service';
import { AllowUnauthenticatedRequest } from 'src/common/modules/auth/guard';
import { REQUEST } from '@nestjs/core';
import { DecoratedFastifyRequest } from 'src/common/interfaces/request';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(REQUEST) private request: DecoratedFastifyRequest,
  ) {}

  @AllowUnauthenticatedRequest()
  @Post('login')
  async login(@Body('email') email: string) {
    return this.usersService.login(email);
  }

  @Get('if-auth-then-renew')
  async ifAuthThenRenew() {
    return this.usersService.login(this.request.raw.user.email);
  }
}
