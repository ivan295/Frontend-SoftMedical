import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();
  private url:string = `${environment.HOST}/paciente`;

  constructor(private http: HttpClient) { }

  listarPacientes(){
    return this.http.get<Paciente[]>(this.url);
  }
  listarPorId(id_patient:number){
    return this.http.get<Paciente>(`${this.url}/${id_patient}`);
  }
  registrarPacientes(paciente:Paciente){
    return this.http.post(this.url,paciente);
  }
  modificarPacientes(paciente:Paciente){
    return this.http.put(this.url,paciente);
  }
  eliminarPaciente(id_patient:number){
    return this.http.delete(`${this.url}/${'?id='+id_patient}`);
  }

}
