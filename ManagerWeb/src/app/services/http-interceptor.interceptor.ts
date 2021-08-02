import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (this.auth.isLogin()) {
      // const token: string = localStorage.getItem('access_token')
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + "myToken")
        // .set('Content-Type', 'application/x-www-form-urlencoded');
        .set('Content-Type', 'application/json')
      const authRequest = request.clone({ headers: headers })
      return next.handle(authRequest)
    // }
    // return next.handle(request)
  }

}