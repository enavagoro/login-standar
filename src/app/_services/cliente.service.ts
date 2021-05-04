import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {  
  private url: string = "http://localhost:8081";  
  constructor(private http:HttpClient,private login:LoginService) {    
  }
  async list() {    

    return this.http.get<any[]>(`${this.url}/cliente/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  getOne(id){
    return this.http.get<any[]>(`${this.url}/cliente/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  update(id,cliente){
    delete cliente.__v;
    return this.http.patch<any[]>(`${this.url}/cliente/${id}` , cliente,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  insert(cliente){
    cliente.status = true;
    return this.http.post<any[]>(`${this.url}/cliente/` ,cliente, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }

}
