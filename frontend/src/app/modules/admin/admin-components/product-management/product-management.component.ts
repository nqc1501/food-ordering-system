import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AdminService } from "../../admin-services/admin.service";
import { MatDialog } from "@angular/material/dialog";
import { AddEditProductComponent } from "../add-edit-product/add-edit-product.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {

  displayedColumns: string[] = [
    'id',
    'name',
    'productCode',
    'image',
    'type',
    'price',
    'quantity',
    'description',
    'action'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() appTruncate: number = 100;

  constructor(
    private service: AdminService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProductList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProductList() {
    this.service.getProductList().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddEditProductComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(AddEditProductComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      }
    });
  }

  deleteProduct(productCode: string) {
    const result = window.confirm("Bạn có mốn xóa món ăn này không?");
    if (result) {
      this.service.deleteProduct(productCode).subscribe({
        next: (res) => {
          this.getProductList();
          this.snackbar.open("Món ăn đã được xóa", "OK", { duration: 5000 });
        },
        error: (err) => {
          this.snackbar.open("Không tìm thấy món ăn. Vui lòng F5.", "Close", { duration: 5000 });
        },
      })
    }
  }

}
