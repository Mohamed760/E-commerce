import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { email, newPassword, registerData, resetcode } from '../../interfaces/data';
import {Enviroment } from '../../../base/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginData } from '../../interfaces/loginData';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:WritableSignal<any> = signal(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router, @Inject(PLATFORM_ID) id:object) { 
    if (isPlatformBrowser(id)) {
      if( localStorage.getItem("userToken")){
        this.decodeUserData();
        _Router.navigate([localStorage.getItem("currentPage")])
      }

    }
  }

  signup (data:registerData):Observable<any>{

    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/api/v1/auth/signup`,data);

  }

  signIn(loginData:loginData):Observable<any>{
    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/api/v1/auth/signin`,loginData)
  }

  decodeUserData(){
    // Decode Token
    const token = JSON.stringify( localStorage.getItem("userToken") );
    const decoded = jwtDecode(token);

    this.userData.set(decoded);
    console.log(this.userData());
    
  }

  logOut(){
    localStorage.removeItem("userToken");
    this.userData.set(null);
    this._Router.navigate(["/login"])
  }

  forgetPassword(data:email):Observable<any>{
    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/api/v1/auth/forgotPasswords`,data);
  }

  verifyResetCode(data:resetcode):Observable<any>{
    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/api/v1/auth/verifyResetCode`,data);
  }

  resetNewPassword(data:newPassword):Observable<any>{
    return this._HttpClient.put<any>(`${Enviroment.baseUrl}/api/v1/auth/resetPassword`,data);
  }

}
