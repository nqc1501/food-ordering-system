import { Injectable } from '@angular/core';

const USER = "c_user";
const TOKEN = "c_token";
const ORDER_ITEMS = "oder_items";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveOrderItem(item: any) {
    // get list items
    let listItems = JSON.parse(window.localStorage.getItem(ORDER_ITEMS));
    if (!listItems) {
      listItems = [];
      listItems.push(item);
    } else {
      if (!listItems.some(existingItem => existingItem.productCode === item.productCode)) {
        listItems.push(item);
      }
    }

    // save to local storage
    window.localStorage.removeItem(ORDER_ITEMS);
    window.localStorage.setItem(ORDER_ITEMS, JSON.stringify(listItems));
  }

  public getListOrderItems() {
    return JSON.parse(window.localStorage.getItem(ORDER_ITEMS));
  }

  public saveOrderItemList(list: any[]) {
    window.localStorage.removeItem(ORDER_ITEMS);
    window.localStorage.setItem(ORDER_ITEMS, JSON.stringify(list));
  }

  public emptyCart() {
    window.localStorage.setItem(ORDER_ITEMS, JSON.stringify([]));
  }

  //
  public getUserID() {
    return JSON.parse(localStorage.getItem(USER)).userID;
  }

  static getToken(): string {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return ' ';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role = this.getUserRole();
    return role == "ADMIN";
  }

  static isUserLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role = this.getUserRole();
    return role == "USER";
  }

  static logout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(ORDER_ITEMS);
  }

  static hasToken() {
    return this.getToken() !== null;

  }
}
