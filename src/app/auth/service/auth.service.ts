import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const helper = new JwtHelperService()

class DecodedToken {
  userid: string = ''
  username: string = ''
  exp: number = 0
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private decodedToken

  constructor(private http: HttpClient, private router: Router) {
    this.decodedToken = JSON.parse(localStorage.getItem('app-meta')!) || new DecodedToken()
  }

  getToken() {
    return localStorage.getItem('app-auth')
  }

  isAuthenticated() {
    return moment().isBefore(moment.unix(this.decodedToken.exp))
  }

  register(userData: any):Observable<any> {
    return this.http.post( '/api/v1/users/register' , userData )
  }

  login(userData: any):Observable<any> {
    return this.http.post( '/api/v1/users/login', userData )
      .pipe(
        map(
          (token) => {
            const strToken = token.toString()

            this.decodedToken = helper.decodeToken(strToken)
            const expirationDate = helper.getTokenExpirationDate(strToken)
            const isExpired = helper.isTokenExpired(strToken)

            localStorage.setItem('app-auth', strToken)
            localStorage.setItem('app-meta', JSON.stringify(this.decodedToken))
            return token
          }
        )
      )
  }

  logout() {
    localStorage.removeItem('app-auth')
    localStorage.removeItem('app-meta')
    this.decodedToken = new DecodedToken()
    this.router.navigate(['/'])
  }



}
