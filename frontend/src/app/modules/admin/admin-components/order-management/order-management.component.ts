import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AdminService } from "../../admin-services/admin.service";
import { MatDialog } from "@angular/material/dialog";
import {OrderDetailsComponent} from "../order-details/order-details.component";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent {

  displayedColumns: string[] = ['no', 'user', 'number', 'list', 'total', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: AdminService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllOrders() {
    this.service.getOrderList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  calculateTotal(list: any[]): number {
    let sum = 0;
    list.forEach(item => {
      sum += item.price * item.quantity;
    });
    return sum;
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {data});
  }
}
