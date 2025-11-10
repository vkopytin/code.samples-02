import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { cookieExists, cookieRead } from '../utils';
import { UserInfo } from './models/UserInfo';
import { UserLoginResult } from './models/userLoginResult';
import { UserRegisterInput } from './models/userRegisterInput';
import { UserRegisterResult } from './models/userRegisterResult';

const authConfig: AuthConfig = {

  // Url des Authorization-Servers
  issuer: environment.issuer,

  // Url der Angular-Anwendung
  // An diese URL sendet der Authorization-Server den Access Code
  redirectUri: window.location.origin + '/index.html',

  // Name der Angular-Anwendung
  clientId: environment.clientId,

  // Rechte des Benutzers, die die Angular-Anwendung wahrnehmen möchte
  scope: 'read:files read:user-info openid profile email offline_access api https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',

  // Code Flow (PKCE ist standardmäßig bei Nutzung von Code Flow aktiviert)
  responseType: 'code'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain: string = environment.idm.domain;

  isLoggedIn = false;

  constructor(
    private oauthService: OAuthService,
    private http: HttpClient,
  ) { }

  async initAuth() {
    this.oauthService.setStorage(localStorage);
    this.oauthService.configure(authConfig);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }

  refreshLogin() {
    this.isLoggedIn = this.oauthService.hasValidAccessToken();
  }

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

  googleLogin(prevUrl: string): Observable<{url: string}> {
    const form = new FormData();

    form.append('accessToken', this.oauthService.getAccessToken());
    form.append('backUrl', prevUrl);

    return this.http.post<{url: string}>(`${this.domain}/home/google-login-url`, form, { withCredentials: true });
  }
}
