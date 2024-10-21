import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    finalize(() => {
      console.log('refresh');
    })
  );
};
