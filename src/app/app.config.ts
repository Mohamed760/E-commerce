import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { setHeadersInterceptor } from './shared/interceptors/set-headers.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { spinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withViewTransitions()), provideClientHydration(),
     provideHttpClient(withFetch(), withInterceptors([setHeadersInterceptor,spinnerInterceptor])), importProvidersFrom(RouterModule, BrowserAnimationsModule,NgxSpinnerModule, TranslateModule.forRoot({
      defaultLanguage : 'en',
      loader : {
        provide : TranslateLoader, 
        useFactory : HttpLoaderFactory,
        deps : [HttpClient]
      }
     })) , ToastrModule, provideAnimations(), provideToastr(), provideAnimationsAsync()]
};
