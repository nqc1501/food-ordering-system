import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./user-components/dashboard/dashboard.component";
import { UserGuard } from "../../auth/guards/user-guard/user.guard";
import { FoodComponent } from "./user-components/food/food.component";
import { DrinksComponent } from "./user-components/drinks/drinks.component";
import { AccountComponent } from "./user-components/account/account.component";
import { CartComponent } from "./user-components/cart/cart.component";
import { PaymentComponent } from "./user-components/payment/payment.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [UserGuard] },
  { path: "account", component: AccountComponent, canActivate: [UserGuard] },
  { path: "food", component: FoodComponent, canActivate: [UserGuard] },
  { path: "drinks", component: DrinksComponent, canActivate: [UserGuard] },
  { path: "cart", component: CartComponent, canActivate: [UserGuard] },
  { path: "payment", component: PaymentComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
