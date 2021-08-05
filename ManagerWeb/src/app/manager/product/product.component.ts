import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  ) { 
    this.cart = this.common.cartService 
  }

  async ngOnInit() {
    this.listProduct = await this.common.Get_Product_Information()
  }

  public Add_Product_Cart(product) {
    if (product["quantity"] == 0) {
      alert("Sản phẩm này đã hết hàng.")
    } else {
      let isProductAvailable = false
      this.cart.forEach(element => {
        if (element["code"] == product["code"]) {
          isProductAvailable = true;
        }
      });
      
      if (isProductAvailable) {
        alert("Sản phẩm này đã có trong hóa đơn.")
      } else {
        product["numberOf"] = 1;
        this.cart.push(product)
        this.common.cartService = this.cart
      }
    }
  }

  public Cancel_Product_Cart(product) {
    let index = 0
    this.cart.forEach(element => {
      if (element["code"] == product["code"]) {
        this.cart.pop(index)
      }
      index = index + 1
    })
    this.common.cartService = this.cart
  }

  public Inscrease_Descrease_NumberOf(product, cmd) {
    if (cmd == "INSCREASE") {
      if (product["numberOf"] + 1 > product["quantity"]) {
        alert("Số lượng sản phẩm trong kho không đủ.")
      } else {
        product["numberOf"] = product["numberOf"] + 1
        this.common.cartService = this.cart
      }
    } else if (cmd == "DESCREASE") {
      if (product["numberOf"] - 1 == 0) {
        this.Cancel_Product_Cart(product)
      } else {
        product["numberOf"] = product["numberOf"] - 1
        this.common.cartService = this.cart
      }
    }
  }

  public Cancel_Receipt() {
    this.cart = []
    this.common.cartService = this.cart
  }
}
