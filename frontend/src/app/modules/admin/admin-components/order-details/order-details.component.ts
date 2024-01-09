import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  validateForm: FormGroup;
  productList: any[];
  selectedProduct: any;

  constructor(
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any | null = null
  ) {
    this.validateForm = this.fb.group({
      userId: ['', Validators.required],
      orderNumber: ['', Validators.required],
      productList: ['', Validators.required],
      total: ['', Validators.required]
    });
  }

  ngOnInit() {
    let sum = 0;
    this.data.orderItemDtoList.forEach(item => {
      sum += item.price * item.quantity
    });
    this.productList = this.data.orderItemDtoList;
    this.selectedProduct = this.productList[0];
    this.validateForm.patchValue({
      userId: this.data.userId,
      orderNumber: this.data.orderNumber,
      total: sum
    });
  }

}
