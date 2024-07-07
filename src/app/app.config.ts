import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthInterceptor } from './auth.interceptor';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },
  provideRouter(routes),
  importProvidersFrom(HttpClientModule),
  provideOAuthClient({
    resourceServer: {
      allowedUrls: [
        'https://account1.azurewebsites.net',
        'https://localhost:3001',
        'https://vko-idm.azurewebsites.net',
        'https://catalog3.azurewebsites.net',
        'http://localhost:3000',
      ],
      sendAccessToken: true,
    }
  })]
};
