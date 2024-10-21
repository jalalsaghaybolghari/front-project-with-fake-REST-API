import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '@services/customer.service';
import {
  addCustomer,
  addCustomerSuccess,
  deleteCustomer,
  deleteCustomerSuccess,
  emptyAction,
  loadCustomer,
  loadCustomerSuccess,
  loadCustomers,
  loadCustomersFail,
  loadCustomersSuccess,
  showAlert,
  updateCustomer,
  updateCustomerSuccess
} from './customer.action';
import { catchError, exhaustMap, finalize, map, of, switchMap, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class CustomerEffects {
  constructor(private action$: Actions, private customerService: CustomerService, private router: Router, private _snackBar: MatSnackBar) {}

  _loadCustomers = createEffect(() =>
    this.action$.pipe(
      ofType(loadCustomers),
      exhaustMap((actions) => {
        return this.customerService.getCustomers().pipe(
          map((data) => {
            return loadCustomersSuccess({ list: data });
          }),
          catchError((_error) => of(loadCustomersFail({ errormessage: _error.message })))
        );
      })
    )
  );

  _addCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(addCustomer),
      switchMap((actions) => {
        return this.customerService.createCustomer(actions.inputData).pipe(
          switchMap(() => {
            return of(addCustomerSuccess(), showAlert({ message: 'added success', resType: 'pass' }));
          }),
          catchError((_error) => of(showAlert({ message: 'failed to add', resType: 'fail' }))),
          finalize(() => {
            this.router.navigate(['customer-list']);
          })
        );
      })
    )
  );
  _updateCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(updateCustomer),
      switchMap((actions) => {
        return this.customerService.updateCustomer(actions.inputData).pipe(
          switchMap(() => {
            return of(updateCustomerSuccess(), showAlert({ message: 'updated success', resType: 'pass' }));
          }),
          catchError((_error) => of(showAlert({ message: 'failed to update', resType: 'fail' }))),
          finalize(() => {
            this.router.navigate(['customer-list']);
          })
        );
      })
    )
  );
  _deleteCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(deleteCustomer),
      switchMap((actions) => {
        return this.customerService.deleteCustomer(actions.id).pipe(
          switchMap(() => {
            return of(deleteCustomerSuccess({ id: actions.id }), showAlert({ message: 'deleted success', resType: 'pass' }));
          }),
          catchError((_error) => of(showAlert({ message: 'failed to delete', resType: 'fail' })))
        );
      })
    )
  );
  _loadCustomer = createEffect(() =>
    this.action$.pipe(
      ofType(loadCustomer),
      exhaustMap((action) => {
        return this.customerService.getCustomer(action.id).pipe(
          map((data) => {
            return loadCustomerSuccess({ selectedCustomer: data });
          }),
          catchError((_error) => of(loadCustomersFail({ errormessage: _error.message })))
        );
      })
    )
  );

  _showAlert = createEffect(() =>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message, action.resType)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  showSnackBarAlert(message: string, resType: string = 'fail') {
    let _panelClass = resType == 'pass' ? 'text-green' : 'text-red';
    return this._snackBar.open(message, 'ok', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: _panelClass
    });
  }
}
