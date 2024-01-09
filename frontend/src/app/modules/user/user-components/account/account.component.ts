import { Component } from '@angular/core';
import { UserService } from "../../user-services/user.service";
import { StorageService } from "../../../../auth/services/storage/storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

    validateForm: FormGroup;

    constructor(
        private service: UserService,
        private storageService: StorageService,
        private fb: FormBuilder,
        private snackbar: MatSnackBar
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
        this.getUserInfo();
    }

    getUserInfo() {
        const id = this.storageService.getUserID();
        this.service.getUserInfo(id).subscribe({
            next: (res) => {
                this.validateForm.patchValue({
                    name: res.name,
                    tel: res.tel,
                    address: res.address,
                    email: res.email,
                    password: res.password
                });
            }
        })
    }

    saveDeliveryInfo() {
      const request = {
        name: this.validateForm.value.name,
        tel: this.validateForm.value.tel,
        address: this.validateForm.value.address,
        email: this.validateForm.value.email
      };

      this.service.updateDelivery(request).subscribe({
        next: (res) => {
          this.snackbar.open("Thay đổi thông tin thành công", "OK", { duration: 5000 });
          this.getUserInfo();
        }
      });
    }

    savePassword() {
      const request = {
        email: this.validateForm.value.email,
        password: this.validateForm.value.password
      }

      this.service.updatePassword(request).subscribe({
        next: (res) => {
          this.getUserInfo();
          this.snackbar.open("Thay đổi thông tin thành công", "OK", { duration: 5000 });
        }
      })
    }
}
