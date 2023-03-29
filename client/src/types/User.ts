export interface UserData {
  fullname: string;
  phone: string;
  email: string;
}

export interface TeacherData extends UserData {
  speciality?: string;
}

export interface StudentData extends UserData {
  course?: Course;
}

export type Course = '1' | '2' | '3' | '4' | '5' | '6';

export enum UserType {
  Student,
  Teacher
}

export function isCourse(value: string): value is Course {
  return ['1', '2', '3', '4', '5', '6'].includes(value);
}

export function isStudent(user: UserData): user is StudentData {
  return (user as StudentData).course !== undefined;
}

export function isTeacher(user: UserData): user is TeacherData {
  return (user as TeacherData).speciality !== undefined;
}
