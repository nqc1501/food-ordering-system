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
  totalItems: number = 0;
  pageTitle: string;
  searchBox: boolean;
  showCart: boolean;

  private titleMappings: { [key: string]: string } = {
    'cart': ' | Giỏ hàng',
    'account': ' | Thông tin tài khoản',
    'payment': ' | Thanh toán'
  }

  constructor(
      private router: Router,
      private userService: UserService,
      private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        this.updateUserLoggedStatus();
        this.updateTitle();
        this.searchBox = currentUrl.includes('account') || currentUrl.includes('cart') || currentUrl.includes('payment');
        this.showCart = !currentUrl.includes('account') && !currentUrl.includes('payment');
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

  updateTitle() {
    const currentUrl = this.router.url;
    const matchingKeyword = Object.keys(this.titleMappings).find(keyword => currentUrl.includes(keyword));
    this.pageTitle = matchingKeyword ? this.titleMappings[matchingKeyword] : '';
  }

  toDashboard() {
    this.router.navigateByUrl('/user/dashboard');
  }
}
