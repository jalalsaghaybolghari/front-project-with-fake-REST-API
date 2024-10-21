import { Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { authGuard } from '@services/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer-list', loadComponent:() => import('@components/customer/list/list.component').then(m => m.CustomerListComponent), canActivate:[authGuard] },
  { path: 'add-customer', loadComponent:() => import('@components/customer/add/add.component').then(m => m.AddCustomerComponent), canActivate:[authGuard]  },
  { path: 'edit-customer/:id', loadComponent:() => import('@components/customer/add/add.component').then(m => m.AddCustomerComponent) , canActivate:[authGuard] }

];
