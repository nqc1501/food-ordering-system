import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "../../admin-services/admin.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent implements OnInit{

  validateForm: FormGroup;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostUserComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.validateForm = this.fb.group({
        name: ['', Validators.required],
        tel: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.validateForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.validateForm.valid) {
      if (this.data) {
        this.service.editUser(this.validateForm.value).subscribe({
            next: (val) => {
              this.snackbar.open("Sửa thông tin tài khoản thành công.", "OK", { duration: 5000 });
              this.dialogRef.close(true);
            }
          }
        );
      } else {
        this.service.addUser(this.validateForm.value).subscribe({
            next: (val) => {
              this.snackbar.open("Thêm tài khoản thành công.", "OK", { duration: 5000 });
              this.dialogRef.close(true);
            },
            error: (error) => {
                this.snackbar.open("Email đã tồn tại. Vui lòng nhập lại.", "Close", { duration: 5000 });
            }
        });
      }
    }
  }

}
