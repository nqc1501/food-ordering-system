import { Component } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "../../user-services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'image',
    'price',
    'quantity',
    'total',
    'action'
  ];
  input: any;
  dataSource: MatTableDataSource<any>;
  grandTotal: number = 0;
  haveProduct: boolean;

  constructor(
    private service: UserService
  ) { }

  ngOnInit() {
    this.getOrderItemList();
  }

  getOrderItemList() {
    this.service.getProducts().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.grandTotal = this.service.getTotalPrice();
        this.haveProduct = res.length > 0;
      }
    });
  }

  removeItem(element: any) {
    this.service.removeCartItem(element);
    this.getOrderItemList();
  }

  emptyCart() {
    this.service.removeAllCart();
  }

}
