import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/model/medico';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-medico-edicion',
  templateUrl: './medico-edicion.component.html',
  styleUrls: ['./medico-edicion.component.css']
})
export class MedicoEdicionComponent implements OnInit {

  form:FormGroup;
  id:number;
  edicion:boolean;
  constructor(
    private route:ActivatedRoute,//tomar la url activa
    private doctorService: MedicoService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id:new FormControl(0),
      nombre:new FormControl(''),
      apellido:new FormControl(''),
      dni:new FormControl(''),
      cmp:new FormControl('')
    });
    this.route.params.subscribe(data=>{
      this.id = data['id'];
      this.edicion=data['id'] != null,
      this.initForm();
    });
  }
  initForm(){
    if(this.edicion){
      this.doctorService.listarPorId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          id:new FormControl(data.id_doctor),
          nombre:new FormControl(data.name),
          apellido:new FormControl(data.lastname),
          dni:new FormControl(data.dni),
          cmp:new FormControl(data.cmp)
        });
      });
    }
  }
  operar(){
    let doctor = new Doctor();
    doctor.id_doctor = this.form.value['id'];
    doctor.name = this.form.value['nombre'];
    doctor.lastname = this.form.value['apellido'];
    doctor.dni = this.form.value['dni'];
    doctor.cmp = this.form.value['cmp'];
    if(this.edicion){
      //modificar
      this.doctorService.modificarDoctor(doctor).subscribe(()=>{
        this.doctorService.listarMedicos().subscribe(data=>{
          this.doctorService.doctorCambio.next(data);
          this.doctorService.mensajeCambio.next('Información modificada');
        });
      });
    }else{
      //registrar
      this.doctorService.registrarDoctor(doctor).subscribe(()=>{ //envio de datos a la funcion registrar
        this.doctorService.listarMedicos().subscribe(data=>{ // llamo a la funcion listar 
          this.doctorService.doctorCambio.next(data); // activo el pacienteCambio 
          this.doctorService.mensajeCambio.next('Información Registrada'); // ejecuto el mensaje
        });
      });
    }
    this.router.navigate(['medico']);
  }

}
