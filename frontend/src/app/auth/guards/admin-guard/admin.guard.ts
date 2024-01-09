import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Injectable } from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../services/storage/storage.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      if (StorageService.isUserLoggedIn()) {
          this.router.navigateByUrl("/user/dashboard");
          this.snackbar.open("You don't have access to this page!", "Close", { duration: 5000 });
          return false;
      } else if (!StorageService.hasToken()) {
          StorageService.logout();
          this.router.navigateByUrl("/login");
          this.snackbar.open("You are not logged in!", "Close", { duration: 5000 });
          return false;
      }
      return true;
  }
}
