import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private REST_API_SERVER = "http://localhost:3000"

  public cartService : any = []

  constructor(
    private http: HttpClient
  ) { }

  public Get_Product_Information() {
    let url = `${this.REST_API_SERVER}/get-product-information`
    return new Promise((resolve, reject) => {
      this.http.get<unknown>(url).subscribe( res => {
        if (res["state"]) {
          resolve(res["mesessge"])
        } else {
          resolve([])
        } 
      })
    })
  }

  public Add_Product(product : any) {
    let url = `${this.REST_API_SERVER}/add-product`
    let data = JSON.stringify(product)
    return new Promise((resolve, reject) => {
      this.http.post<unknown>(url, data).subscribe( res => {
        resolve(res["state"])
      })
    })
  }

  public Update_Product(product : any) {
    let url = `${this.REST_API_SERVER}/update-product`
    let data = JSON.stringify(product)
    return new Promise((resolve, reject) => {
      this.http.post<unknown>(url, data).subscribe( res => {
        resolve(res["state"])
      })
    })
  }

  public Delete_Product(product : any) {
    let url = `${this.REST_API_SERVER}/delete-product`
    let data = JSON.stringify(product)
    return new Promise((resolve, reject) => {
      this.http.post<unknown>(url, data).subscribe( res => {
        resolve(res["state"])
      })
    })
  }

  public Export_Receipt(cart : any) {
    let url = `${this.REST_API_SERVER}/receipt-payment`
    let data = JSON.stringify(cart)
    return new Promise((resolve, reject) => {
      this.http.post<unknown>(url, data).subscribe( res => {
        resolve(res["state"])
      })
    })
  }

  public Query_Product(code) {
    let url = `${this.REST_API_SERVER}/query-product`
    let codeQuery = {
      code : code
    }
    let data = JSON.stringify(codeQuery)
    return new Promise((resolve, reject) => {
      this.http.post<unknown>(url, data).subscribe( res => {
        resolve(res)
      })
    })
  }

}
