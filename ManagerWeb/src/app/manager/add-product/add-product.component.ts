import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

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

  async Add_Product() {
    let result = await this.common.Add_Product(this.information_product.value)
    if (result) {
      alert("Thêm sản phẩm thành công.")
      location.reload();
    } else {
      alert("Thêm sản phẩm thất bại! Có thể xảy ra lỗi trùng mã sản phẩm.")
    }
  }
}
