import { createAction, props } from '@ngrx/store';
import { Customer } from '@models/customer';

export const LOAD_CUSTOMERS = '[customer] load customers';
export const LOAD_CUSTOMERS_SUCCESS = '[customer] load customers success';
export const LOAD_CUSTOMERS_FAIL = '[customer] load customers fail';

export const ADD_CUSTOMER = '[customer] add customer';
export const ADD_CUSTOMER_SUCCESS = '[customer] add success';

export const UPDATE_CUSTOMER = '[customer] update customer';
export const UPDATE_CUSTOMER_SUCCESS = '[customer] update success';

export const DELETE_CUSTOMER = '[customer] delete customer';
export const DELETE_CUSTOMER_SUCCESS = '[customer] delete success';

export const LOAD_CUSTOMER = '[customer] load customer';
export const LOAD_CUSTOMER_SUCCESS = '[customer] load customer success';

export const SHOW_ALERT = '[customer] show alert';

export const loadCustomers = createAction(LOAD_CUSTOMERS);
export const loadCustomersSuccess = createAction(LOAD_CUSTOMERS_SUCCESS, props<{ list: Customer[] }>());
export const loadCustomersFail = createAction(LOAD_CUSTOMERS_FAIL, props<{ errormessage: string }>());

export const addCustomer = createAction(ADD_CUSTOMER, props<{ inputData: Customer }>());
export const addCustomerSuccess = createAction(ADD_CUSTOMER_SUCCESS);

export const updateCustomer = createAction(UPDATE_CUSTOMER, props<{ inputData: Customer }>());
export const updateCustomerSuccess = createAction(UPDATE_CUSTOMER_SUCCESS);

export const deleteCustomer = createAction(DELETE_CUSTOMER, props<{ id: string }>());
export const deleteCustomerSuccess = createAction(DELETE_CUSTOMER_SUCCESS, props<{ id: string }>());

export const loadCustomer = createAction(LOAD_CUSTOMER, props<{ id: string }>());
export const loadCustomerSuccess = createAction(LOAD_CUSTOMER_SUCCESS, props<{ selectedCustomer: Customer }>());

export const showAlert = createAction(SHOW_ALERT, props<{ message: string; resType: string }>());
export const emptyAction = createAction('empty action');
