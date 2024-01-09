import { Component } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "../../user-services/user.service";
import { StorageService } from "../../../../auth/services/storage/storage.service";
import { MatDialog } from "@angular/material/dialog";
import { DeliveryInfoComponent } from "../delivery-info/delivery-info.component";
import { Router } from "@angular/router";
import {map, max} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  displayedColumns: string[] = [
    'image', 'name', 'price', 'quantity', 'total'
  ];
  dataSource: MatTableDataSource<any>;
  grandTotal: number = 0;
  info: any;
  list: any[] = [];

  constructor(
    private service: UserService,
    private storageService: StorageService,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getOrderItemList();
    this.getInfo();
    this.getOrderRequest();
  }

  getOrderItemList() {
    this.service.getProducts().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.grandTotal = this.service.getTotalPrice();
        }
    });
  }

  getInfo() {
    const id: number = this.storageService.getUserID();
    this.service.getUserInfo(id).subscribe({
       next: (res) => {
         this.info = res;
       }
    });
  }

  openInfoForm(data: any) {
    const dialogRef = this.dialog.open(DeliveryInfoComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getOrderItemList();
        this.getInfo();
      }
    });
  }

  getOrderRequest() {
    this.service.getProducts().subscribe({
      next: (res) => {
        this.list = res.map(item => ({
          productCode: item.productCode,
          price: item.price,
          quantity: item.quantity
        }));
      }
    });
  }

  saveOrder() {
    const orderRequest = {
      userId: this.storageService.getUserID(),
      orderItemDtoList: this.list
    }

    this.list.forEach(item => {
      let maxQuantity: number;
      this.service.getProductByProductCode(item.productCode).subscribe({
        next: (res) => {
          maxQuantity = res.quantity - item.quantity;
          const request = {
            productCode: item.productCode,
            quantity: maxQuantity
          };
          this.service.updateQuantity(request).subscribe({
            next: (res) => {
              console.log(request.quantity);
            }
          });
        }
      });
    });

    this.service.saveOrder(orderRequest).subscribe({
      next: (res) => {
        this.snackbar.open("Bạn đã thanh toán thành công.", "OK", { duration: 5000 });
        this.service.removeAllCart();
        this.router.navigateByUrl('/user/dashboard');
      }
    });
  }
}
