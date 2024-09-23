import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../base/enviroment';
import { Observable } from 'rxjs';
import { CartRes } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  addProductToCart(productId:string):Observable<any>{

    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/cart`,{productId:productId})
  }

  getLoggedUserCart():Observable<CartRes>{
    return this._HttpClient.get<CartRes>(`${Enviroment.baseUrl}/api/v1/cart`)
  }

  updateProductCartNumber(productId:string, count:string):Observable<CartRes>{
    return this._HttpClient.put<CartRes>(`${Enviroment.baseUrl}/api/v1/cart/${productId}`,{count:count })
  }

  removeProductFromCart(productId:string):Observable<CartRes>{
    return this._HttpClient.delete<CartRes>(`${Enviroment.baseUrl}/api/v1/cart/${productId}`)
  }
}
