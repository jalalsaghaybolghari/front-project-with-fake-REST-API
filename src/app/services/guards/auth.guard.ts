import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

export const authGuard: CanActivateFn = (route, state) => {
  let customerService = inject(CustomerService);
  let router = inject(Router);

  if (customerService.hasAccess()) {
    return true;
  } else {
    alert('authorization has error');
    router.navigate(['/']);
    return false;
  }
};
