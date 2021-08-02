import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  public listProduct : any = []
  public cart : any = []

  constructor(
    private common : CommonService
  ) { }

  async ngOnInit() {
    this.listProduct = await this.common.Get_Product_Information()
  }

  Add_Cart(product) {
    let isProductAvailable = false
    this.cart.forEach(element => {
      if (element["type"] == product["type"]) {
        isProductAvailable = true;
      }
    });
    
    if (isProductAvailable) {
      alert("Sản phẩm này đã có trong hóa đơn")
    } else {
      this.cart.push(product)
    }
  }

  Cancel_Product_Cart(product) {
    let index = 0
    this.cart.forEach(element => {
      if (element["type"] == product["type"]) {
        this.cart = this.cart.pop(index)
      }
      index = index + 1
    });
    console.log(this.cart)
  }
}
