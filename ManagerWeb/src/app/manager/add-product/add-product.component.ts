import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public information_product = new FormGroup({
    name_product: new FormControl('', [Validators.required, Validators.minLength(3)]),
    type_product: new FormControl('', [Validators.required, Validators.minLength(3)]),
    code_product: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price_product: new FormControl('', [Validators.required, Validators.minLength(3)]),
    quantity_product: new FormControl('', [Validators.required, Validators.minLength(3)]),
    code_save_product: new FormControl('', [Validators.required, Validators.minLength(3)]),
    photo_product: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description_product: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  detail() {
    console.log(this.information_product)
  }
}
