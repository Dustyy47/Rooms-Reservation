import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { courses } from './../constants/index';

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  fullname: string;
}

export class SignUpStudentDTO extends SignUpDTO {
  @IsIn(courses)
  course: (typeof courses)[number];
}

export class SignUpTeacherDTO extends SignUpDTO {
  @IsString()
  speciality: string;
}
