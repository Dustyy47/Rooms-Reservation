import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { MongoIdDTO } from 'src/rooms/dto'
import { AuthService } from './auth.service'
import { User } from './decorators'
import { SignInDTO, SignUpDTO, SignUpStudentDTO, SignUpTeacherDTO } from './dto'
import { AdminGuard, JwtGuard } from './guards'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signUp/student')
    signUpStudent(@Body() dto: SignUpStudentDTO) {
        return this.authService.signUpStudent(dto)
    }

    @Post('signUp/teacher')
    signUpTeacher(@Body() dto: SignUpTeacherDTO) {
        return this.authService.signUpTeacher(dto)
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Post('signUp/admin')
    signUpAdmin(@Body() dto: SignUpDTO) {
        return this.authService.signUpAdmin(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    signIn(@Body() dto: SignInDTO) {
        return this.authService.signIn(dto)
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async getMe(@User('id') { id: userId }: MongoIdDTO) {
        console.log(userId)
        return await this.authService.getMe(userId)
    }
}
