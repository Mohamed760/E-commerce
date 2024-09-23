import { HttpInterceptorFn } from '@angular/common/http';

export const setHeadersInterceptor: HttpInterceptorFn = (req, next) => {


  
if (typeof localStorage != 'undefined') {
 let  userTokenHeader = {
    token : localStorage.getItem("userToken")!
  }

  if (
    req.url.includes("cart")||
    req.url.includes("wishList")||
    req.url.includes("order")||
    req.url.includes("cashorder")
  ) {
    
    req = req.clone({
      setHeaders  : userTokenHeader
    })
  }


}

  return next(req);
};
