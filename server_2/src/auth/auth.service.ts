import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { SignUpStudentDTO, SignUpTeacherDTO } from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signUpStudent(dto: SignUpStudentDTO) {
    return 'signed up Student!';
  }

  signUpTeacher(dto: SignUpTeacherDTO) {
    return 'signed up Teacher!';
  }

  signIn() {
    return 'signed in';
  }
}
