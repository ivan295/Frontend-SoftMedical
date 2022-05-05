import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  listarPacientes(){
    return this.http.get<Paciente[]>('http://localhost:8080/paciente');
  }

}
