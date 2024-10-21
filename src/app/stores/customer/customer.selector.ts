import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerModel } from "@models/customer";


const _getCustomerState = createFeatureSelector<CustomerModel>('customer');

export const getCustomerList = createSelector(_getCustomerState, state =>{
    return state.list;
})
export const getCustomer = createSelector(_getCustomerState, state =>{
    return state.selectedCustomer;
})