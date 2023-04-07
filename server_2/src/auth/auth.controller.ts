import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInDTO,
  SignUpDTO,
  SignUpStudentDTO,
  SignUpTeacherDTO,
} from './dto';
import { AdminGuard, JwtGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp/student')
  signUpStudent(@Body() dto: SignUpStudentDTO) {
    return this.authService.signUpStudent(dto);
  }

  @Post('signUp/teacher')
  signUpTeacher(@Body() dto: SignUpTeacherDTO) {
    return this.authService.signUpTeacher(dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Post('signUp/admin')
  signUpAdmin(@Body() dto: SignUpDTO) {
    return this.authService.signUpAdmin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() dto: SignInDTO) {
    return this.authService.signIn(dto);
  }
}
