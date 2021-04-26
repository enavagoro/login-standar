import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

interface auth {
  accessToken : string;
  refreshToken : string;
  userId : string;
}

@Injectable()

export class AuthService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient, private login : LoginService) { }

  async logUser(user){
    //this.url = "https://api.vase.cl";
    return this.http.post<auth>(`${this.url}/auth/`, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}