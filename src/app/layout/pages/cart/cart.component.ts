import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  data!:Data;
  errMsg!:string;
  constructor(private _CartService:CartService, ){}

  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem("currentPage", "/cart")
    }
    this.getLoggedUserCart();
  }

  getLoggedUserCart(){
    this._CartService.getLoggedUserCart().subscribe({
      next: (res)=> {
        this.data = res.data;
        console.log(this.data);
        
      },
      error: (err)=>{
        this.errMsg = err.error.message;
      }
    })
  }

  updateProductCartCount(productId:string, count:number){

      if(count <= 0 ){
        this.deleteProductFromCart(productId);
      }
      else{

        this._CartService.updateProductCartNumber(productId, count.toString()).subscribe({
          next : (res)=> {
            console.log(res.data);
            this.data = res.data;
          },
          error: (err)=> {
            console.log(err);
            
          }
        })
      }

  }

  deleteProductFromCart(productId:string){
    this._CartService.removeProductFromCart(productId).subscribe({
      next : (res)=> {
        this.data = res.data;
        console.log(res);
      }
    })
  }

}
