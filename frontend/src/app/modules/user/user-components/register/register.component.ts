import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../user-services/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private service: UserService,
      private router: Router,
      private snackbar: MatSnackBar
    ) { }

    ngOnInit() {
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      })
    }

    register() {
      if (this.registerForm.valid) {
        this.service.register(this.registerForm.value).subscribe({
          next: (res) => {
            this.router.navigateByUrl('/login');
            this.snackbar.open("Bạn đã đăng ký thành công.", "OK", { duration: 5000 });
          },
          error: (err) => {
            this.snackbar.open("Email đã tồn tại.", "Close", { duration: 5000 });
          }
        });
      }
    }
}
