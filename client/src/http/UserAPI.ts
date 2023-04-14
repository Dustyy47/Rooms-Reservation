import { handleFetchError } from '@/helpers/handleFetchError';
import { UserRegisterDTO } from '@/types/DTO';
import jwtDecode from 'jwt-decode';
import { $authHost } from '.';
import { UserLoginDTO } from './../types/DTO';
import { AuthTokenDecoded } from './../types/HTTP';
import { isStudent, StudentData, TeacherData } from './../types/User';

class UserAPI {
  async fetchUser() {
    try {
      const data = await $authHost.get<StudentData | TeacherData>('/auth/me');
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async register(dto: UserRegisterDTO) {
    try {
      let token;
      let data;
      data = await $authHost.post<string>(
        `/auth/registration/${isStudent(dto) ? 'student' : 'teacher'}`,
        { ...dto }
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

  async login(dto: UserLoginDTO) {
    try {
      let token;
      let data;
      data = await $authHost.post<{ access_token: string }>(`/auth/signIn`, {
        ...dto
      });
      token = data.data.access_token;
      console.log(token);
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
