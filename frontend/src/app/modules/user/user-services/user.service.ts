import { Injectable } from '@angular/core';
import { StorageService } from "../../../auth/services/storage/storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

const USER_URL = ['http://localhost:9001/'];
const PRODUCT_URL = ['http://localhost:9002/'];
const ORDER_URL = ['http://localhost:9003/'];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public cartItemList = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(
      private http: HttpClient,
      private storageService: StorageService
  ) {
    this.cartItemList = this.storageService.getListOrderItems();
    this.productList.next(this.cartItemList);
  }

  // User info precessing
  register(userRequest: any) {
    return this.http.post<[]>(USER_URL + 'api/v1/user/register', userRequest);
  }

  getUserInfo(id: number): Observable<any>  {
    return this.http.get(USER_URL + `api/v1/user/get-user-info/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateUserInfo(userRequest: any) {
    return this.http.put<[]>(USER_URL + 'api/v1/user/update-user-info', userRequest, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateDelivery(request: any) {
    return this.http.put<[]>(USER_URL + 'api/v1/user/update-delivery', request, {
      headers: this.createAuthorizationHeader()
    });
  }

  updatePassword(request: any) {
    return this.http.put(USER_URL + 'api/v1/user/update-password', request, {
      headers: this.createAuthorizationHeader()
    });
  }

  // product processing
  getProductList() {
    return this.http.get<[]>(PRODUCT_URL + 'api/v1/product/get-products', {
      headers: this.createAuthorizationHeader()
    });
  }

  getProductByType(type: string) {
    return this.http.get<[]>(PRODUCT_URL + `api/v1/product/get-product-by-type/${type}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getProductByProductCode(productCode: string): Observable<any> {
    return this.http.get(PRODUCT_URL + `api/v1/product/get-product/${productCode}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateQuantity(request: any) {
    return this.http.put(PRODUCT_URL + 'api/v1/product/update-quantity', request, {
      headers: this.createAuthorizationHeader()
    });
  }


  // cart processing
  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: any) {
    this.storageService.saveOrderItem(product);
    this.cartItemList = this.storageService.getListOrderItems();
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      grandTotal += item.price * item.quantity;
    });
    return grandTotal;
  }

  removeCartItem(productCode: string) {
    this.cartItemList.map((item: any, index: any) => {
      if (productCode === item.productCode) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
    this.storageService.saveOrderItemList(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.storageService.emptyCart();
  }

  // order
  saveOrder(request: any): Observable<any> {
    return this.http.post<[]>(ORDER_URL + 'api/v1/order/post-order', request, {
      headers: this.createAuthorizationHeader()
    });
  }

  // authentication
  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
        "Authorization", "Bearer " + StorageService.getToken()
    );
  }

}
