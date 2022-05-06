import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(
    private http: HttpClient
  ) { }

    registrarConsulta(consulta:Consulta){
      return this.http.post('http://localhost:8080/consulta',consulta);
    }

    listarConsultas(): Observable<Consulta[]>{
      return this.http.get<Consulta[]>('localhost:8080/consulta');
    }

}
