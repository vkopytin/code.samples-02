import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { cookieExists, cookieRead } from '../utils';
import { UserLoginResult } from './models/userLoginResult';
import { UserRegisterInput } from './models/userRegisterInput';
import { UserRegisterResult } from './models/userRegisterResult';
import { UserInfo } from './models/UserInfo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain: string = environment.idm.domain;

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return cookieExists('token');
  }

  accessToken(): string | undefined {
    return cookieRead('token');
  }

  generateApplicationAccessToken(clientId: string): Observable<{ accessToken: string; }> {
    const formData = new FormData();
    formData.append('client_id', clientId);
    formData.append('grant_type', 'appToken');
    return this.http.post<{ access_token: string; }>(`${this.domain}/Auth/app-token`, formData)
      .pipe(map(({ access_token }) => ({ accessToken: access_token })));
  }

  login(username: string, password: string): Observable<UserLoginResult> {
    const req = this.http.post(`${this.domain}/Auth/Login`, {
      userName: username,
      password,
    }, { withCredentials: true, observe: 'response' });

    return req.pipe(map(({ headers, body }) => {
      const token = headers.get('Authorization');
      if (token) {
        document.cookie = 'token=' + token;
      }
      return body as UserLoginResult;
    }));
  }

  register(registerInput: UserRegisterInput): Observable<UserRegisterResult> {
    return this.http.post<UserRegisterResult>(`${this.domain}/Auth/Register`, {
      name: registerInput.name,
      username: registerInput.username,
      password: registerInput.password,
      role: registerInput.role,
    }, { withCredentials: true });
  }

  userInfo(): Observable<UserInfo> {
    const accessToken = cookieRead('token');
    return this.http.get<UserInfo>(`${this.domain}/Auth/user-info`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });
  }

  googleLogin(): Observable<{url: string}> {
    const form = new FormData();

    return this.http.post<{url: string}>(`${this.domain}/home/google-login-url`, form, { withCredentials: true });
  }
}
