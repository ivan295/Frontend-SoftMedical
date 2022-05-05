import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  form:FormGroup;
  id:number;
  edicion:boolean;
  constructor(
    private route:ActivatedRoute,//tomar la url activa
    private pacienteService: PacienteService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id:new FormControl(0),
      nombre:new FormControl(''),
      apellido:new FormControl(''),
      dni:new FormControl(''),
      direccion:new FormControl(''),
      telefono:new FormControl(''),
      edad:new FormControl(''),
      genero:new FormControl('')
    });
    this.route.params.subscribe(data=>{
      this.id = data['id'];
      this.edicion=data['id'] != null,
      this.initForm();
    });
  }
  initForm(){
    if(this.edicion){
      this.pacienteService.listarPorId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          id:new FormControl(data.id_patient),
          nombre:new FormControl(data.name),
          apellido:new FormControl(data.lastname),
          dni:new FormControl(data.dni),
          direccion:new FormControl(data.address),
          telefono:new FormControl(data.phone),
          edad:new FormControl(data.age),
          genero:new FormControl(data.gender)
        });
      });
    }
  }
  
  operar(){
    let paciente = new Paciente();
    paciente.id_patient = this.form.value['id'];
    paciente.name = this.form.value['nombre'];
    paciente.lastname = this.form.value['apellido'];
    paciente.dni = this.form.value['dni'];
    paciente.address = this.form.value['direccion'];
    paciente.phone = this.form.value['telefono'];
    paciente.age = this.form.value['edad'];
    paciente.gender = this.form.value['genero'];

    if(this.edicion){
      //modificar
      this.pacienteService.modificarPacientes(paciente).subscribe(()=>{
        this.pacienteService.listarPacientes().subscribe(data=>{
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('Información modificada');
        });
      });
    }else{
      //registrar
      this.pacienteService.registrarPacientes(paciente).subscribe(()=>{
        this.pacienteService.listarPacientes().subscribe(data=>{
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('Información Registrada');
        });
      });
    }
    this.router.navigate(['paciente']);
  }

}
