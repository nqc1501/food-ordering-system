import {Component, ViewChild} from '@angular/core';
import {AdminService} from "../../admin-services/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {PostUserComponent} from "../post-user/post-user.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  displayedColumns: string[] = ['no', 'name', 'tel', 'address', 'email', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private dialog: MatDialog,
      private service: AdminService,
      private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  openAddForm() {
    const dialogRef = this.dialog.open(PostUserComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllUsers();
        }
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(PostUserComponent, {data});
    dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getAllUsers();
          }
        }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteUser(id: number) {
    const result = window.confirm("Bạn có mốn xóa tài khoản này không?");
    if (result) {
      this.service.deleteUser(id).subscribe({
        next: (res) => {
          this.getAllUsers();
          this.snackbar.open("Tài khoản đã được xóa", "OK", { duration: 5000 });
        },
        error: (err) => {
          this.snackbar.open("Không tìm thấy tài khoản. Vui lòng F5.", "Close", { duration: 5000 });
        }
      });
    }
  }

}
