import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Speciality } from 'src/app/model/Speciality';
import { EspecialidadService } from 'src/app/service/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  form:FormGroup;
  id:number;
  edicion:boolean;
  
  constructor(
    private route:ActivatedRoute,//tomar la url activa
    private specialidadService: EspecialidadService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id:new FormControl(0),
      descripcion:new FormControl('')
    });
    this.route.params.subscribe(data=>{
      this.id = data['id'];
      this.edicion=data['id'] != null,
      this.initForm();
    });
  }

  initForm(){
    if(this.edicion){
      this.specialidadService.listarPorId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          id:new FormControl(data.id_speciality),
          descripcion:new FormControl(data.description)
        });
      });
    }
  }

  operar(){
    let speciality = new Speciality();
    speciality.id_speciality = this.form.value['id'];
    speciality.description = this.form.value['descripcion'];
    if(this.edicion){
      //modificar
      this.specialidadService.modificarSpeciality(speciality).subscribe(()=>{
        this.specialidadService.listarEspecialidad().subscribe(data=>{
          this.specialidadService.specialityCambio.next(data);
          this.specialidadService.mensajeCambio.next('Información modificada');
        });
      });
    }else{
      //registrar
      this.specialidadService.registrarSpeciality(speciality).subscribe(()=>{ //envio de datos a la funcion registrar
        this.specialidadService.listarEspecialidad().subscribe(data=>{ // llamo a la funcion listar 
          this.specialidadService.specialityCambio.next(data); // activo el pacienteCambio 
          this.specialidadService.mensajeCambio.next('Información Registrada'); // ejecuto el mensaje
        });
      });
    }
    this.router.navigate(['especialidad']);
  }

}
