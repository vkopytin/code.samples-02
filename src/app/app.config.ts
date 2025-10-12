import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
import { OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { loadingInterceptor } from './loading.interceptor';

function storageFactory() : OAuthStorage {
  return localStorage;
}

export const appConfig: ApplicationConfig = {
  providers: [
  provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
  { provide: OAuthStorage, useFactory: storageFactory },
  provideOAuthClient({
    resourceServer: {
      allowedUrls: [
        'https://account3.azurewebsites.net',
        'https://localhost:3001',
        'https://vko-idm.azurewebsites.net',
        'https://catalog3.azurewebsites.net',
        'http://localhost:3000',
      ],
      sendAccessToken: true,
    }
  })]
};
