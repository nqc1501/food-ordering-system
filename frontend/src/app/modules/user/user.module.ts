import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './user-components/dashboard/dashboard.component';
import { FoodComponent } from './user-components/food/food.component';
import { DrinksComponent } from './user-components/drinks/drinks.component';
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
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    DashboardComponent,
    FoodComponent,
    DrinksComponent,
    AccountComponent,
    ProductComponent,
    CartComponent,
    PaymentComponent
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
    MatPaginatorModule
  ]
})
export class UserModule { }
