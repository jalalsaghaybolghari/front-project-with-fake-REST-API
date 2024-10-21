import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<Customer[]>('http://localhost:3004/customers');
  }
  getCustomer(id: string) {
    return this.http.get<Customer>(`http://localhost:3004/customers/${id}`);
  }
  createCustomer(customer: Customer) {
    console.log('request');
    return this.http.post<Customer>('http://localhost:3004/customers', customer);
  }
  updateCustomer(customer: Customer) {
    return this.http.patch<Customer>(`http://localhost:3004/customers/${customer.id}`, customer);
  }
  deleteCustomer(id: string) {
    return this.http.delete<Customer>(`http://localhost:3004/customers/${id}`);
  }
  hasAccess() {
    return true;
  }
}
