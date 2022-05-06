import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Speciality } from '../model/Speciality';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  specialityCambio = new Subject<Speciality[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http:HttpClient) { }

  listarEspecialidad(){
    return this.http.get<Speciality[]>('http://localhost:8080/especialidad');
  }
  listarPorId(id_speciality:number){
    return this.http.get<Speciality>('http://localhost:8080/especialidad/'+id_speciality);
  }
  registrarSpeciality(speciality:Speciality){
    return this.http.post('http://localhost:8080/especialidad',speciality);
  }
  modificarSpeciality(speciality:Speciality){
    return this.http.put('http://localhost:8080/especialidad',speciality);
  }
  eliminarSpeciality(id_speciality:number){
    return this.http.delete('http://localhost:8080/especialidad?id='+id_speciality);
  }
}
