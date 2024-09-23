import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../shared/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
product!:Product;

constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService, private toastr: ToastrService){}

ngOnInit(): void {
 this.getProductById();
}


getProductById(){
  let id:string = ""

this._ActivatedRoute.params.subscribe({
  next : (res)=> {
    id = res['id'];
  }
})

this._ProductService.getProductById(id).subscribe({
  next: (res)=> {
    console.log(res.data);
    this.product = res.data;
  },

  error: (err)=> {
    console.log(err);
    
  }
})

}

addProductToCart(productId:string){
  this._CartService.addProductToCart(productId).subscribe({
    next : (res)=> {
      console.log(res);
      this.toastr.success(res.message, "", {
        progressBar: true,
        positionClass : 'toast-top-right'
      });
    },

    error: (err)=> {
      console.log(err);
      
    }
  })
}

}
