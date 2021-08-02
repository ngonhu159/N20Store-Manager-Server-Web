import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private REST_API_SERVER = "http://localhost:3000"

  // product = new BehaviorSubject<any>([])
  // listProduct = this.product.asObservable()

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
    // return this.http.get<unknown>(url).subscribe( res => { console.log(res) });
  }

  public Add_Product(product : any) {
    let url = `${this.REST_API_SERVER}/add-product`
    let data = JSON.stringify(product)
    console.log(data)
    return new Promise((resolve, reject) => {
      this.http.post<unknown>(url, data).subscribe( res => {
        resolve(res["state"])
      })
    })
  }

}
