import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Consulta } from 'src/app/model/consulta';
import { Doctor } from 'src/app/model/medico';
import { Paciente } from 'src/app/model/paciente';
import { Speciality } from 'src/app/model/Speciality';
import { ConsultaService } from 'src/app/service/consulta.service';
import { EspecialidadService } from 'src/app/service/especialidad.service';
import { MedicoService } from 'src/app/service/medico.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  form:FormGroup;
  pacientes: Paciente[];
  medicos: Doctor[];
  especialidades: Speciality[];

  idPacienteSeleccionado: number;
  idMedicoSeleccionado: number;
  idEspecialidadSeleccionado: number;
  sala:number;

  constructor(
    private pacienteserv: PacienteService,
    private doctorserv: MedicoService,
    private specialityserv: EspecialidadService,
    private consultserv: ConsultaService,
    private snackbar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.Cargarselects();
   
  }
  Cargarselects(){
    this.pacienteserv.listarPacientes().subscribe(data =>this.pacientes = data);
    this.doctorserv.listarMedicos().subscribe(data => this.medicos = data);
    this.specialityserv.listarEspecialidad().subscribe(data => this.especialidades= data);
  }

  registrarConsulta(){
    let medicobj = new Doctor();
    medicobj.id_doctor =  this.idMedicoSeleccionado;

    let pacienteobj = new Paciente();
    pacienteobj.id_patient = this.idPacienteSeleccionado;
    
    let specialityobj = new Speciality();
    specialityobj.id_speciality =this.idEspecialidadSeleccionado;

    let consulta = new Consulta();
    consulta.doctor=medicobj;
    consulta.patient=pacienteobj;
    consulta.speciality=specialityobj;
    consulta.num_sala = this.sala;
     //console.log(consulta);

    this.consultserv.registrarConsulta(consulta).subscribe(()=>{
    this.snackbar.open('Datos registrados','Aviso',{duration:4000});
    });

  }
  

}
