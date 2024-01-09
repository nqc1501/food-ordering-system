import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./admin-components/dashboard/dashboard.component";
import { AdminGuard } from "../../auth/guards/admin-guard/admin.guard";
import { UserManagementComponent } from "./admin-components/user-management/user-management.component";
import { ProductManagementComponent } from "./admin-components/product-management/product-management.component";
import { OrderManagementComponent } from "./admin-components/order-management/order-management.component";
import { PaymentManagementComponent } from "./admin-components/payment-management/payment-management.component";
import { AccountComponent } from "./admin-components/account/account.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AdminGuard] },
  { path: "user-management", component: UserManagementComponent, canActivate: [AdminGuard] },
  { path: "product-management", component: ProductManagementComponent, canActivate: [AdminGuard] },
  { path: "order-management", component: OrderManagementComponent, canActivate: [AdminGuard] },
  { path: "payment-management", component: PaymentManagementComponent, canActivate: [AdminGuard] },
  { path: "account", component: AccountComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
