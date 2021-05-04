import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class CardService {  
  private url: string = "http://localhost:8080";  
  constructor(private http:HttpClient,private login:LoginService) {    
  }
  async list() {    

    return this.http.get<any[]>(`${this.url}/card/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  getOne(id){
    return this.http.get<any[]>(`${this.url}/card/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  update(id,card){
    delete card.__v;
    return this.http.patch<any[]>(`${this.url}/card/${id}` , card,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  insert(card){
    card.status = true;
    return this.http.post<any[]>(`${this.url}/card/` ,card, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }

}
