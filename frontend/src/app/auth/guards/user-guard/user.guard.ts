import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { StorageService } from "../../services/storage/storage.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (StorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl("/admin/dashboard");
      this.snackbar.open("You don't have access to this page!", "Close", { duration: 5000 });
      return false;
    } else if (!StorageService.hasToken()) {
      StorageService.logout();
      this.router.navigateByUrl("/login");
      this.snackbar.open("You are not logged in!");
      return false;
    }
    return true;
  }
}
