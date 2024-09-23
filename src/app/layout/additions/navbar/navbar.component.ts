import { ChangeDetectionStrategy, Component, effect, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../../shared/services/myTranslate/my-translate.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,TranslateModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})


export class NavbarComponent implements OnInit{
  isLogin:boolean = false;

  constructor(public _AuthService:AuthService, private _MyTranslateService:MyTranslateService){
    effect( ()=> {
      if(this._AuthService.userData?.() != null){
        this.isLogin= true;
      }
      else{
        this.isLogin=false;
      }
    })
  }

  ngOnInit(): void {





    // this._AuthService.userData?.subscribe( ()=>{
    //   if(this._AuthService.userData?.getValue() != null){
    //     this.isLogin= true;
    //   }
    //   else{
    //     this.isLogin=false;
    //   }
    // } )



  }

  changLang(lang:string){
    this._MyTranslateService.changLang(lang)
  }



}
