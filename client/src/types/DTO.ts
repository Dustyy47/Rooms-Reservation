import { StudentData, TeacherData, UserData } from './User';

export type UserRegisterDTO = (TeacherData | StudentData) & {
  password: string;
};

export type UserLoginDTO = Pick<UserData, 'email'> & {
  password: string;
};
