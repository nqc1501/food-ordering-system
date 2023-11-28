import { Component } from '@angular/core';
import {UserService} from "../../user-services/user.service";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {

  public productList : any;

  constructor(
    private service: UserService
  ) {
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.service.getProductList().subscribe({
      next: (res) => {
        this.productList = res;
      }
    });
  }
}
