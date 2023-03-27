export interface UserData {
  fullname: string;
  phone: string;
  email: string;
}

export interface TeacherData extends UserData {
  speciality?: string;
}

export interface StudentData extends UserData {
  course?: string;
}

export type UserAuthData = (TeacherData | StudentData) & { password: string };

export function isStudent(user: UserData): user is StudentData {
  return (user as StudentData).course !== undefined;
}

export function isTeacher(user: UserData): user is TeacherData {
  return (user as TeacherData).speciality !== undefined;
}
