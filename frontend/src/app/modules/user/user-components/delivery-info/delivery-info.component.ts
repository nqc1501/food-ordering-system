import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { UserService } from "../../user-services/user.service";

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent {

  validateForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DeliveryInfoComponent>,
      private service: UserService,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.validateForm = this.fb.group({
      name: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.validateForm.patchValue({
      name: this.data.name,
      tel: this.data.tel,
      address: this.data.address,
      email: this.data.email
    });
  }

  onFormSubmit() {
    if (this.validateForm.valid) {
      this.service.updateDelivery(this.validateForm.value).subscribe({
        next: (res) => {
          this.dialogRef.close(true);
        }
      });
    }
  }

}
