import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./user-components/dashboard/dashboard.component";
import { UserGuard } from "../../auth/guards/user-guard/user.guard";
import { AccountComponent } from "./user-components/account/account.component";
import { CartComponent } from "./user-components/cart/cart.component";
import { PaymentComponent } from "./user-components/payment/payment.component";
import { RegisterComponent } from "./user-components/register/register.component";
import { noAuthGuard } from "../../auth/guards/noAuth-guard/no-auth.guard";
import { ProductComponent } from "./user-components/product/product.component";
import { OrderingComponent } from "./user-components/ordering/ordering.component";

const routes: Routes = [
  { path: "register", component: RegisterComponent, canActivate: [noAuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [UserGuard] },
  { path: "account", component: AccountComponent, canActivate: [UserGuard] },
  { path: "cart", component: CartComponent, canActivate: [UserGuard] },
  { path: "payment", component: PaymentComponent, canActivate: [UserGuard] },
  { path: "product/:productCode", component: ProductComponent, canActivate: [UserGuard] },
  { path: "ordering", component: OrderingComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
