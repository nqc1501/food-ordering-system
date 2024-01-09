import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "../../../auth/services/storage/storage.service";
import { Observable } from "rxjs";

const USER_URL = ['http://localhost:9001/'];
const PRODUCT_URL = ['http://localhost:9002/'];
const ORDER_URL = ['http://localhost:9003/'];


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  // processing user data
  addUser(userRequest: any): Observable<any> {
    return this.http.post<[]>(USER_URL + 'api/v1/admin/post-user', userRequest, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<[]>(USER_URL + 'api/v1/admin/get-users', {
      headers: this.createAuthorizationHeader()
    });
  }

  editUser(userRequest: any): Observable<any> {
    return this.http.put<[]>(USER_URL + 'api/v1/admin/update-user', userRequest, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<[]>(USER_URL + `api/v1/admin/delete-user/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // processing product data

  getProductList(): Observable<any> {
    return this.http.get<[]>(PRODUCT_URL + 'api/v1/product/get-products', {
      headers: this.createAuthorizationHeader()
    });
  }

  addProduct(productRequest: any): Observable<any> {
    return this.http.post<[]>(PRODUCT_URL + 'api/v1/product/post-product' , productRequest, {
      headers: this.createAuthorizationHeader()
    });
  }

  editProduct(productRequest: any): Observable<any> {
    return this.http.put<[]>(PRODUCT_URL + 'api/v1/product/put-product', productRequest, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteProduct(code: string): Observable<any> {
    return this.http.delete<[]>(PRODUCT_URL + `api/v1/product/delete-product/${code}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // order processing
  getOrderList() {
    return this.http.get<[]>(ORDER_URL + 'api/v1/order/get-orders', {
      headers: this.createAuthorizationHeader()
    })
  }

  // authenticate
  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
        "Authorization", "Bearer " + StorageService.getToken()
    );
  }

}
