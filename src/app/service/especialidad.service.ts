import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Speciality } from '../model/Speciality';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  specialityCambio = new Subject<Speciality[]>();
  mensajeCambio = new Subject<string>();
  private url:string = `${environment.HOST}/especialidad`;

  constructor(private http:HttpClient) { }

  listarEspecialidad(){
    return this.http.get<Speciality[]>(this.url);
  }
  listarPorId(id_speciality:number){
    return this.http.get<Speciality>(`${this.url}/${id_speciality}`);
  }
  registrarSpeciality(speciality:Speciality){
    return this.http.post(this.url,speciality);
  }
  modificarSpeciality(speciality:Speciality){
    return this.http.put(this.url,speciality);
  }
  eliminarSpeciality(id_speciality:number){
    return this.http.delete(`${this.url}/${'?id='+id_speciality}`);
  }
}
