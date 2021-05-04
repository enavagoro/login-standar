import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataStorageService } from './dataStorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private token : string = "";
  private url: string = "http://localhost:8080";
  private enterprise : string = "";
  private user : string = "";

  constructor(private router:Router,private dataStorage : DataStorageService ,private http:HttpClient) {
    var val = this.dataStorage.get('user');
    
    /*
    if(val){
      this.setEnterprise(val['enterprise']);
      this.setToken(val['token']);
    }
    else{
      this.router.navigate(['/login'], {replaceUrl: true});
    }
    */
  }
  
  public getUrl(){
    return new Promise(resolve => {
      resolve("http://localhost:8080");
    });
  }
  
  public getEnterprise(){
    return this.enterprise;
  }  
  public setEnterprise(em){
    this.enterprise = em;
  }
  public setToken(t){
    this.token = t;
  }
  public getToken(){
    return "Bearer "+this.token;
  }
  public setUser(user){
    this.dataStorage.set('user', user);
    this.user = user;
  }
  public getUserId(){
   return this.user['_id'];
  }

  async getUser(form){
    this.url = <string>await this.getUrl();
    //this.url = "https://api.vase.cl";
    console.log('estoy dentro');

    return this.http.post<any[]>(`${this.url}/users/login/`,form , {
      headers: new HttpHeaders()
      .set('Authorization','Bearer '+this.token)
      .set('Content-Type', 'application/json')
    });
  }
}