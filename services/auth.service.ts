import axios from 'axios';
import type { LoginDto, RegisterDto } from '../typings';

export type RequestOptions = {
  headers?: Headers;
};

class AuthService {
  doLogin(loginDto: LoginDto) {
    return this.post('/api/auth/login', loginDto);
  }

  doRegister(registerDto: RegisterDto) {
    return this.post('/api/auth/register', registerDto);
  }

  private get(url: string, options?: RequestOptions) {
    return this.request('GET', url, null, options);
  }

  private post(url: string, data: unknown, options?: RequestOptions) {
    return this.request('POST', url, data, options);
  }

  private request(
    method: 'POST' | 'GET',
    url: string,
    data: unknown,
    options?: RequestOptions,
  ) {
    return axios({
      method,
      url,
      data,
    });
  }
}

export const authService = new AuthService();
