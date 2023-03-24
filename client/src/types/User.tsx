export interface UserData {
  fullname: string;
  phone: string;
  email: string;
}

export interface TeacherData extends UserData {
  speciality: string;
}

export interface StudentData extends UserData {
  course: '1' | '2' | '3' | '4' | '5' | '6';
}
