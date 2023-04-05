import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpStudentDTO, SignUpTeacherDTO } from './dto';

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

  @Post('signIn')
  signIn(@Body() dto: SignInDTO) {
    return this.authService.signIn();
  }
}
