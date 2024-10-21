export interface Customer {
  id?: string | null;
  code: string;
  name: string;
  email: string | null;
  phone: string;
}

export interface CustomerModel {
  list: Customer[];
  errormessage: string;
  selectedCustomer: Customer | undefined;
}
