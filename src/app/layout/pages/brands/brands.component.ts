import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductService } from '../../../shared/services/product/product.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {

    this.getAllProduct()

    if (typeof localStorage != "undefined") {
      localStorage.setItem("currentPage", "/brands")
    }
  }

  getAllProduct() {
    this._ProductService.getAllProduct().pipe(

      map((res) => {

        res.data.map((item) => {
          item.price = item.price * 10;
          return item;
        })

        return res;
      })

    )
      .subscribe({
        next: (res) => {
          console.log(res);

        },

        error: (err) => {
          console.log(err);

        }
      })
  }

}
