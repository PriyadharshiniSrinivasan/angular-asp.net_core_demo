import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http'; 
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthenticationService {
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      console.log(Error);
      return null;
    }
  }
  myAppUrl: string = "";  
  constructor(private http: HttpClient, private _http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;  
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.myAppUrl + 'api/Login', { username, password })
      .pipe(map(user => {
        if (user && user.token) {
          // decode token
          localStorage.setItem('TokenInfo', JSON.stringify(user));
          let tokenInfo = this.getDecodedAccessToken(user.token);
          console.log(tokenInfo.unique_name);
          localStorage.setItem('Role', JSON.stringify(tokenInfo.unique_name));
        }
        return user;
      }))
  }

  logout() {
    localStorage.removeItem('TokenInfo');
  }
}

  
