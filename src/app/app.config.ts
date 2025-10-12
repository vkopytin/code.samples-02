import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { provideRouter } from '@angular/router';
import { OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
import { loadingInterceptor } from './loading.interceptor';
import { environment } from '../environments/environment';

function storageFactory() : OAuthStorage {
  return localStorage;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideMessaging(() => getMessaging()),
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
    }),
  ]
};
