import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './user-components/dashboard/dashboard.component';
import { AccountComponent } from './user-components/account/account.component';
import { ProductComponent } from './user-components/product/product.component';
import { CartComponent } from './user-components/cart/cart.component';
import { PaymentComponent } from './user-components/payment/payment.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RegisterComponent } from './user-components/register/register.component';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { DeliveryInfoComponent } from './user-components/delivery-info/delivery-info.component';
import { MatDialogModule } from "@angular/material/dialog";
import { OrderingComponent } from './user-components/ordering/ordering.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,
    ProductComponent,
    CartComponent,
    PaymentComponent,
    RegisterComponent,
    DeliveryInfoComponent,
    OrderingComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCardModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule
    ]
})
export class UserModule { }
