import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async login(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    return {
      token,
      email: user.email,
      role: user.role,
      displayName: user.displayName,
    };
  }
}
