import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consulta } from '../model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url:string = `${environment.HOST}/consulta`;

  constructor(
    private http: HttpClient
  ) { }

    registrarConsulta(consulta:Consulta){
      return this.http.post(this.url,consulta);
    }

    listarConsultas(): Observable<Consulta[]>{
      return this.http.get<Consulta[]>(this.url);
    }

}
