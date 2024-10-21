import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let _token = '213fbcfg';

  const nonAuthUrls = ['/public/data'];

  if (nonAuthUrls.some((url) => req.url.startsWith(url))) {
    let reqWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${_token}`
      }
    });
    return next(reqWithToken);
  }
  return next(req);
};
