import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public information_product = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('', [Validators.required, Validators.minLength(1)]),
    code: new FormControl('', [Validators.required, Validators.minLength(1)]),
    price: new FormControl('', [Validators.required, Validators.minLength(1)]),
    warranty: new FormControl('', [Validators.required, Validators.minLength(1)]),
    quantity: new FormControl('', [Validators.required, Validators.minLength(1)]),
    storage: new FormControl('', [Validators.required, Validators.minLength(1)]),
    photo: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl('')
  })

  constructor(
    private common : CommonService
  ) { }

  ngOnInit(): void {
  }

  public async Query_Product() {
    if (!this.information_product.value.code) {
      alert("Vui lòng nhập mã sản phẩm!")
    } else {
      let result = await this.common.Query_Product(this.information_product.value.code)
      if (result["state"]) {
        this.information_product.value.name = result["mesessge"][0]["name"]
        await this.Delay(1);
        this.information_product.value.type = result["mesessge"][0]["type"]
        await this.Delay(1);
        this.information_product.value.price = result["mesessge"][0]["price"]
        await this.Delay(1);
        this.information_product.value.warranty = result["mesessge"][0]["warranty"]
        await this.Delay(1);
        this.information_product.value.quantity = result["mesessge"][0]["quantity"]
        await this.Delay(1);
        this.information_product.value.storage = result["mesessge"][0]["storage"]
        await this.Delay(1);
        this.information_product.value.photo = result["mesessge"][0]["photo"]
        await this.Delay(1);
        this.information_product.value.description = result["mesessge"][0]["description"]
      } else {
        alert("Đã xảy ra lỗi hoặc không thể truy vấn với mã sản phẩm này!")
      }
    }
  }
  
  public async Update_Product() {
    let result = await this.common.Update_Product(this.information_product.value)
    if (result) {
      alert("Chỉnh sửa thành công!")
      location.reload();
    } else {
      alert("Chỉnh sửa thất bại!")
    }
  }

  public Delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
