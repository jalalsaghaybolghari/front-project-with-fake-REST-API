import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '@services/token.interceptor';
import { refreshTokenInterceptor } from '@services/refresh-token.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CustomerReducer } from '@stores/customer/customer.reducer';
import { CustomerEffects } from '@stores/customer/customer.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor, refreshTokenInterceptor])),
    provideStore({ customer: CustomerReducer }),
    provideEffects([CustomerEffects])
  ]
};
