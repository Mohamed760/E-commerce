import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/enviroment';
import { Observable } from 'rxjs';
import { CategoryRes } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategroy():Observable<CategoryRes>{
   return this._HttpClient.get<CategoryRes>(`${Enviroment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategory(categoryid:string){
    return this._HttpClient.get<any>(`${Enviroment.baseUrl}/api/v1/categories/${categoryid}`)
  }
}
