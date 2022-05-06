import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Doctor } from '../model/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  doctorCambio = new Subject<Doctor[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listarMedicos(){
    return this.http.get<Doctor[]>('http://localhost:8080/doctor');
  }
  listarPorId(id_doctor:number){
    return this.http.get<Doctor>('http://localhost:8080/doctor/'+id_doctor);
  }
  registrarDoctor(doctor:Doctor){
    return this.http.post('http://localhost:8080/doctor',doctor);
  }
  modificarDoctor(doctor:Doctor){
    return this.http.put('http://localhost:8080/doctor',doctor);
  }
  eliminarDoctor(id_doctor:number){
    return this.http.delete('http://localhost:8080/doctor?id='+id_doctor);
  }
}
