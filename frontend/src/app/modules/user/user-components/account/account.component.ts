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

    onSubmit() {
        if (this.validateForm.valid) {
            this.service.updateUserInfo(this.validateForm.value).subscribe({
                next: (res) => {
                    console.log(res);
                    this.snackbar.open("Bạn đã sửa thông tin thành công.", "OK", { duration: 5000 });
                    this.getUserInfo();
                },
                error: (err) => {

                }
            })
        }
    }
}
