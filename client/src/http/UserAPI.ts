import { handleFetchError } from '@/helpers/handleFetchError';
import jwtDecode from 'jwt-decode';
import { $authHost } from '.';
import { AuthTokenDecoded } from './../types/HTTP';
import {
  isStudent,
  StudentData,
  TeacherData,
  UserAuthDTO
} from './../types/User';

class UserAPI {
  async fetchUser() {
    try {
      const data = await $authHost.get<StudentData | TeacherData>('/auth/me');
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async register(form: UserAuthDTO) {
    try {
      let token;
      let data;
      data = await $authHost.post<string>(
        `/auth/registration/${isStudent(form) ? 'student' : 'teacher'}`,
        { ...form }
      );
      token = data.data;
      return {
        data: jwtDecode<AuthTokenDecoded>(token),
        token
      };
    } catch (e) {
      return handleFetchError(e);
    }
  }
}

export default new UserAPI();
