import { ChangeDetectorRef, Component } from '@angular/core';
import { StorageService } from "./auth/services/storage/storage.service";
import { NavigationEnd, Router } from "@angular/router";
import { UserService } from "./modules/user/user-services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAdminLoggedIn: boolean;
  isUserLoggedIn: boolean;
  public totalItems: number = 0;

  constructor(
      private router: Router,
      private userService: UserService,
      private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedStatus();
      }
    });
    this.getTotalItems();
  }

  private updateUserLoggedStatus() {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl('/login');
  }

  getTotalItems() {
    this.userService.getProducts().subscribe({
      next: (res) => {
        this.totalItems = res.length;
        this.cdr.detectChanges();
      }
    });
  }

  toDashboard() {
    this.router.navigateByUrl('/user/dashboard');
  }
}
