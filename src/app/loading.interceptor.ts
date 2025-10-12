import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, tap} from 'rxjs/operators'
import { LoadingService } from './services/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loading = inject(LoadingService);
    loading.setLoading(true, request.url);
    return next.handle(request)
      .pipe(catchError((err) => {
        loading.setLoading(false, request.url);
        return of(err);
      }))
      .pipe(
        tap((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            loading.setLoading(false, request.url);
          }
        })
      );
  }
}

const impl = new HttpRequestInterceptor();

export const loadingInterceptor: HttpInterceptorFn = (req, next) =>
{
    return impl.intercept(req, {handle: next});
};
