import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../model/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  doctorCambio = new Subject<Doctor[]>();
  mensajeCambio = new Subject<string>();
  private url:string = `${environment.HOST}/doctor`;

  constructor(private http: HttpClient) { }

  listarMedicos(){
    return this.http.get<Doctor[]>(this.url);
  }
  listarPorId(id_doctor:number){
    return this.http.get<Doctor>(`${this.url}/${id_doctor}`);
  }
  registrarDoctor(doctor:Doctor){
    return this.http.post(this.url,doctor);
  }
  modificarDoctor(doctor:Doctor){
    return this.http.put(this.url,doctor);
  }
  eliminarDoctor(id_doctor:number){
    return this.http.delete(`${this.url}/${'?id='+id_doctor}`);
  }
}
