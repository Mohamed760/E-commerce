import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private _TranslateService:TranslateService, @Inject(PLATFORM_ID) platformId:object) { 

    if (isPlatformBrowser(platformId)) {

          // Declare Var : set Defualt Lang
    let deafaultLang = 'en';

    // Get Lang From LocalStorage 
    let savedLang = localStorage.getItem('lang');

    // Condition Check savedLang if true >> change defaultLang =savedlang
    if(savedLang){
      deafaultLang = savedLang;
    }

    _TranslateService.setDefaultLang(deafaultLang);
    _TranslateService.use(deafaultLang);

    // call method
    this.changeDirection(deafaultLang);
      
    }


  }

  changeDirection(lang:string){

    if(lang === 'en'){
      document.dir = "ltr"
    }
    else if(lang === 'ar'){
      document.dir = "rtl"
    }

  }

  changLang(lang:string){
      localStorage.setItem("lang", lang);
      this._TranslateService.setDefaultLang(lang);
      this._TranslateService.use(lang);
      this.changeDirection(lang);
  }

}
