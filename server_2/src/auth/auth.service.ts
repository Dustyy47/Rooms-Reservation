import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { SignInDTO, SignUpStudentDTO, SignUpTeacherDTO } from './dto';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUpStudent(dto: SignUpStudentDTO) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const student = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
          fullname: dto.fullname,
          course: dto.course,
          type: 'STUDENT',
        },
      });
      return student;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('Credentials taken');
      }
      throw e;
    }
  }

  async signUpTeacher(dto: SignUpTeacherDTO) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const teacher = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
          fullname: dto.fullname,
          speciality: dto.speciality,
          type: 'TEACHER',
        },
      });
      return teacher;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('Credentials taken');
      }
      throw e;
    }
  }

  async signIn(dto: SignInDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await bcrypt.compare(dto.password, user.hash);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
