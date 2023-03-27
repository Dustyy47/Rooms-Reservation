export interface RegistrationForm {
  email: string;
  password: string;
  fullname: string;
  specialField: string;
  phone: string;
  type: 'teacher' | 'student';
}
