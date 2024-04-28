import { BadRequestException, Injectable } from '@nestjs/common';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(signupAuthDto: SignupAuthDto) {
    if (!signupAuthDto.name)
      throw new BadRequestException('Name cannot be null');
    if (!signupAuthDto.email)
      throw new BadRequestException('Email cannot be null');
    if (!signupAuthDto.password)
      throw new BadRequestException('Password cannot be null');

    const user = await this.prisma.user.findUnique({
      where: { email: signupAuthDto.email },
    });
    if (user) throw new BadRequestException('Email is existed');

    try {
      return await this.prisma.user.create({
        data: {
          name: signupAuthDto.name,
          email: signupAuthDto.email,
          password: bcrypt.hashSync(
            signupAuthDto.password,
            Number(process.env.SALT_BCRYPT),
          ),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async signin(signinAuthDto: SigninAuthDto) {
    if (!signinAuthDto.email)
      throw new BadRequestException('Email cannot be null');
    if (!signinAuthDto.password)
      throw new BadRequestException('Password cannot be null');

    try {
      const user = await this.prisma.user.findUnique({
        where: { email: signinAuthDto.email },
      });

      if (!user) {
        throw new BadRequestException('Email is not exist');
      }

      const isPasswordValid = await bcrypt.compare(
        signinAuthDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Wrong password');
      }

      const { password, ...userWithoutPassword } = user;
      const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET);
      return {
        token,
        data: {
          ...userWithoutPassword,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
