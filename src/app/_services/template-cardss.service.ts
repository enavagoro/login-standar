import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class Template-cardsService {  
  private url: string = "http://localhost:8081";  
  constructor(private http:HttpClient,private login:LoginService) {    
  }
  async listar() {    

    return this.http.get<any[]>(`${this.url}/template-cards/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  traerUno(id){
    return this.http.get<any[]>(`${this.url}/template-cards/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  actualizar(id,template-cards){
    delete template-cards.__v;
    return this.http.patch<any[]>(`${this.url}/template-cards/${id}` , template-cards,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  insertar(template-cards){
    template-cards.estado = 1;
    return this.http.post<any[]>(`${this.url}/template-cards/` ,template-cards, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }

}
