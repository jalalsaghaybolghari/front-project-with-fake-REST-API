import { createReducer, on } from '@ngrx/store';
import { customerState } from './customer.state';
import { deleteCustomerSuccess, loadCustomerSuccess, loadCustomersFail, loadCustomersSuccess } from './customer.action';

const _customerReducer = createReducer(
  customerState,
  on(loadCustomersSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      selectedCustomer: undefined,
      errormessage: ''
    };
  }),
  on(loadCustomersFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage
    };
  }),
  on(deleteCustomerSuccess, (state, action) => {
    let _newData = state.list.filter((i) => i.id != action.id);
    return {
      ...state,
      list: _newData,
      errormessage: ''
    };
  }),
  on(loadCustomerSuccess, (state, action) => {
    return {
      ...state,
      selectedCustomer: action.selectedCustomer,
      errormessage: ''
    };
  }),
);

export const CustomerReducer = (state: any, action: any) => {
  return _customerReducer(state, action);
};
