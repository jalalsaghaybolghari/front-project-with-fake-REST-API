import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@modules/Material.Module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '@models/customer';
import { Store } from '@ngrx/store';
import { addCustomer, loadCustomer, updateCustomer } from '@stores/customer/customer.action';
import { getCustomer } from '@stores/customer/customer.selector';

@Component({
  selector: 'add-customer',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddCustomerComponent implements OnInit {
  constructor(private builder: FormBuilder, private store: Store, private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this._loadCustomer();
  }
  public pageTitle: string = 'Add Customer';
  public id: string | null = null;

  customerForm = this.builder.group({
    code: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required)
  });

  private _loadCustomer() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id') as string;
    if (this.id != null && this.id != '') {
      this.pageTitle = 'Update Customer';
      this.store.dispatch(loadCustomer({ id: this.id }));
      this.store
        .select(getCustomer)
        .pipe()
        .subscribe((item) =>
          this.customerForm.setValue({ code: item?.code || '', name: item?.name || '', email: item?.email || '', phone: item?.phone || '' })
        );
    }
  }

  SaveCustomer() {
    if (this.customerForm.valid) {
      const customer: Customer = {
        code: this.customerForm.value.code as string,
        name: this.customerForm.value.name as string,
        email: this.customerForm.value.email as string,
        phone: this.customerForm.value.phone as string
      };
      if (this.id == null) {
        this.store.dispatch(addCustomer({ inputData: customer }));
      } else {
        customer.id = this.id;
        this.store.dispatch(updateCustomer({ inputData: customer }));
      }
    }
  }
}
