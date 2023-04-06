import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { SignUpStudentDTO, SignUpTeacherDTO } from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

  signIn() {
    return 'signed in';
  }
}
