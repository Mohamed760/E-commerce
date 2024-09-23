import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/enviroment';
import { Address } from '../../interfaces/data';
import { Observable } from 'rxjs';
import { cashOrderRes } from '../../interfaces/cahsorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private _HttpClient:HttpClient) { }

  checkout(cartId:string, data:Address):Observable<any>{
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${Enviroment.baseUrlWebsite}`, 
    {
      shippingAdderss : data
    }
  
  )
  }

  checkOutCash(cashid:string, data:Address):Observable<cashOrderRes>{
   return this._HttpClient.post<cashOrderRes>(`${Enviroment.baseUrl}/api/v1/orders/${cashid}`,
      {
        shippingAddress : data
      }
    )
  }

}
