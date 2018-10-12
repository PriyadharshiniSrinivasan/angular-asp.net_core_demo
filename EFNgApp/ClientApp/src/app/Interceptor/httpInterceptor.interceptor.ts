import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

    let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo'));

    if (tokenInfo && tokenInfo.token) {
      request = request.clone({
        setHeaders: {
          Authourization: 'Bearer ${tokenInfo.token}',
          'Content-Type': 'application/x-form-urlencoded;charset=utf-8'
        }
      });
    }

    return newRequest.handle(request);
  }

}
