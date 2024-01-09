import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { PostUserComponent } from './admin-components/post-user/post-user.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { UserManagementComponent } from './admin-components/user-management/user-management.component';
import { MatDialogModule } from "@angular/material/dialog";
import { AddEditProductComponent } from './admin-components/add-edit-product/add-edit-product.component';
import { ProductManagementComponent } from './admin-components/product-management/product-management.component';
import { OrderManagementComponent } from './admin-components/order-management/order-management.component';
import { PaymentManagementComponent } from './admin-components/payment-management/payment-management.component';
import { AccountComponent } from './admin-components/account/account.component';
import { MatSelectModule } from "@angular/material/select";
import { OrderDetailsComponent } from './admin-components/order-details/order-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostUserComponent,
    UserManagementComponent,
    AddEditProductComponent,
    ProductManagementComponent,
    OrderManagementComponent,
    PaymentManagementComponent,
    AccountComponent,
    OrderDetailsComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        FormsModule,

        MatProgressSpinnerModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule
    ]
})
export class AdminModule { }
