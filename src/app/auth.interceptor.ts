import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, Router } from '@angular/router';

const skipWhenAuthorizationHeaderIsDefined = (target: {}, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('Authorization')) {
      return next.handle(req);
    }

    return originalMethod.call(this, req, next);
  }
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private oauthService: OAuthService, private router: Router, private route: ActivatedRoute) {

  }

  @skipWhenAuthorizationHeaderIsDefined
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.oauthService.getAccessToken();

    if (accessToken) {
      const authRequest = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      return next.handle(authRequest).pipe(
        catchError((error) => {
          return of(this.autoLogin(error));
        })
      );
    }

    return next.handle(req);
  }

  autoLogin<T extends { status: number; }>(error: T): T {
    const { status }: { status?: number } = error;
    if (status === 401) {
      this.router.navigate(
        [{ outlets: { account: 'login' } }],
        { queryParams: { prevUrl: this.route.url }}
      );
    }

    return error;
  }
}