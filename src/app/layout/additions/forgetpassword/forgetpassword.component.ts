import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

isLoading:boolean = false;
isLoadingCode:boolean = false;
isLoadingPassword:boolean = false;


errMsg!:string;
errMsgCode!:string;
errMsgPassword!:string;

emailFormFlag:boolean = true;
codeFormFlag:boolean = false;
newPasswordFormFlag:boolean = false;


  emailForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email])
  })

  codeForm:FormGroup = new FormGroup({
    resetCode:new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{4,}$/)])
  })

  newPasswordForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)])
  })

  constructor(private _AuthService:AuthService, private _Router:Router ){}

  submitEmailForm(){
    console.log(this.emailForm);
    
    if(this.emailForm.valid){
      this.isLoading=true;
      this._AuthService.forgetPassword(this.emailForm.value).subscribe({

        next: (res)=> {
          console.log(res);
          this.isLoading =false;
          this.emailFormFlag = false;
          this.codeFormFlag=true;
        },

        error : (err)=> {
          console.log(err);
          this.isLoading =false;
          this.errMsg = err.error.message;
        }

      })
    }
  }

  submitCodeForm(){
    console.log(this.codeForm);

    if (this.codeForm.valid) {
      this.isLoadingCode= true;
      this._AuthService.verifyResetCode(this.codeForm.value).subscribe({

        next: (res)=> {
          console.log(res);
          this.isLoadingCode = false;
          this.codeFormFlag =false;
          this.newPasswordFormFlag=true;
        },

        error : (err) => {
          console.log(err);
          this.isLoadingCode = false;
          this.errMsgCode = err.error.message;
        }
      })
    }
    
  }

  submitNewPasswordForm(){
    console.log(this.newPasswordForm);

    if(this.newPasswordForm.valid){
      this.isLoadingPassword=true;
      this._AuthService.resetNewPassword(this.newPasswordForm.value).subscribe({
        next : (res)=> {
          console.log(res);
          this.isLoadingPassword =false;

          localStorage.setItem("userToken", res.token);
          this._AuthService.decodeUserData();
          this._Router.navigate(["/home"])
        },
        error: (err) => {
          console.log(err);
          this.isLoadingPassword=false;
          this.errMsgPassword = err.error.message;
        }
      })
    }
    
  }

}
