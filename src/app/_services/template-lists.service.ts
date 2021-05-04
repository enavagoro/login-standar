import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class Template-listService {  
  private url: string = "http://localhost:8081";  
  constructor(private http:HttpClient,private login:LoginService) {    
  }
  async listar() {    

    return this.http.get<any[]>(`${this.url}/template-list/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  traerUno(id){
    return this.http.get<any[]>(`${this.url}/template-list/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  actualizar(id,template-list){
    delete template-list.__v;
    return this.http.patch<any[]>(`${this.url}/template-list/${id}` , template-list,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  insertar(template-list){
    template-list.estado = 1;
    return this.http.post<any[]>(`${this.url}/template-list/` ,template-list, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }

}
