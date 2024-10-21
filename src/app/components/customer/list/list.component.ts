import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '@models/customer';
import { MaterialModule } from '@modules/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteCustomer, loadCustomers } from '@stores/customer/customer.action';
import { getCustomerList } from '@stores/customer/customer.selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public customerDate!: Customer[];
  public dataSource: any;
  public displayColumns: string[] = ['code', 'name', 'email', 'phone', 'actions'];
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.LoadInitData();
  }

  deleteCustomer(id: string) {
    if (confirm('do you want to remove customer?')) {
      this.store.dispatch(deleteCustomer({ id: id }));
    }
  }

  private LoadInitData() {
    this.store.dispatch(loadCustomers());
    this.store.select(getCustomerList).subscribe((res) => {
      this.customerDate = res;
      this.dataSource = new MatTableDataSource(this.customerDate);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
