import { Component } from '@angular/core';
import { UserService } from "../../user-services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  productList: any;
  type: string = null;

  constructor(
    private service: UserService
  ) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.service.getProductList().subscribe({
      next: (res) => {
        this.productList = res;
        this.productList.forEach((product: any) => {
          Object.assign(product, {quantity: 1, total: product.price})
        });
      }
    })
  }

  addToCart(item: any) {
    this.service.addToCart(item);
  }

  openForm(type: string) {
    if (type === 'all') {
      this.getProductList();
    } else {
      this.getProductByType(type);
    }
  }

  getProductByType(type: string) {
    this.service.getProductByType(type).subscribe({
      next: (res) => {
        this.productList = res;
        this.productList.forEach((product: any) => {
          Object.assign(product, {quantity: 1, total: product.price})
        });
      }
    });
  }
}
