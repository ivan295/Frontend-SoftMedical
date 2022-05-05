import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Paciente } from '../model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listarPacientes(){
    return this.http.get<Paciente[]>('http://localhost:8080/paciente');
  }
  listarPorId(id_patient:number){
    return this.http.get<Paciente>('http://localhost:8080/paciente/'+id_patient);
  }
  registrarPacientes(paciente:Paciente){
    return this.http.post('http://localhost:8080/paciente',paciente);
  }
  modificarPacientes(paciente:Paciente){
    return this.http.put('http://localhost:8080/paciente',paciente);
  }
  eliminarPaciente(id_patient:number){
    return this.http.delete('http://localhost:8080/paciente?id='+id_patient);
  }

}
