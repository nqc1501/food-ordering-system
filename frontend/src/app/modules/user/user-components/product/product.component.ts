import { Component } from '@angular/core';
import { UserService } from "../../user-services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  productCode: string;
  product: any;
  maxQuantity: number;
  quantity: number = 1;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.productCode = this.route.snapshot.params['productCode'];
    this.getProductDetail(this.productCode);
  }

  getProductDetail(productCode: string) {
    this.service.getProductByProductCode(productCode).subscribe({
      next: (res) => {
        this.product = res;
        this.maxQuantity = res.quantity;
      }
    });
  }

  decreaseQuantity() {
    this.quantity--;
    this.checkLimit();
  }

  increaseQuantity() {
    this.quantity++;
    this.checkLimit();
  }

  checkLimit() {
    if (this.quantity < 1) {
      this.quantity = 1;
    } else if (this.quantity > this.maxQuantity) {
      this.quantity =  this.maxQuantity;
    }
  }

  addToCart(item: any) {
    item.quantity = this.quantity;
    item.total = item.price * this.quantity;
    this.service.addToCart(item);
  }

  toCart(item: any) {
    item.quantity = this.quantity;
    item.total = item.price * this.quantity;
    this.router.navigateByUrl('/user/cart');
    this.service.addToCart(item);
  }

}
