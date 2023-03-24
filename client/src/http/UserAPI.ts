import { $authHost } from '.';
import { StudentData, TeacherData } from './../types/User';
class UserAPI {
  async fetchUser() {
    try {
      const data = await $authHost.get<StudentData | TeacherData>('/auth/me');
      return data.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default new UserAPI();
