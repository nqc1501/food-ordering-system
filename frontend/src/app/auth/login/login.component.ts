import { Component } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../services/storage/storage.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup | undefined;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.service.login(
        this.loginForm.get(['email'])!.value,
        this.loginForm.get(['password'])!.value
    ).subscribe((response) => {
      if (StorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl("admin/dashboard");
      } else if (StorageService.isUserLoggedIn()) {
        this.router.navigateByUrl("user/dashboard");
      }
    })
  }

}
