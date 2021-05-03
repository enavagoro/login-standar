import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class EntidadService {  
  private url: string = "http://localhost:8081";  
  constructor(private http:HttpClient,private login:LoginService) {    
  }
  async listar() {    

    return this.http.get<any[]>(`${this.url}/entidad/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  traerUno(id){
    return this.http.get<any[]>(`${this.url}/entidad/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  actualizar(id,entidad){
    delete entidad.__v;
    return this.http.patch<any[]>(`${this.url}/entidad/${id}` , entidad,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }
  insertar(entidad){
    entidad.estado = 1;
    return this.http.post<any[]>(`${this.url}/entidad/` ,entidad, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())      
    });
  }

}
