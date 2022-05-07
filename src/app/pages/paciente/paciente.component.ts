import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/service/paciente.service';
import { Paciente } from 'src/app/model/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
 
  datasource:MatTableDataSource<Paciente>;
  displayedColumns: string[]=['nombres','apellidos','dni','address','phone','age','gender','acciones'];

  constructor(
    private pacienteService : PacienteService,
    private snackbar:MatSnackBar
    ) { }

  ngOnInit(): void {

    this.pacienteService.mensajeCambio.subscribe(data=>{
      this.snackbar.open(data,'AVISO',{duration:4000})
    }); 

    this.pacienteService.pacienteCambio.subscribe(data =>{
      this.datasource = new MatTableDataSource(data);
    });

    this.pacienteService.listarPacientes().subscribe(data =>{
      this.datasource = new MatTableDataSource(data);
    });
  }
  
  filtrar(e: any){
    this.datasource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(id_patient:number){
    this.pacienteService.eliminarPaciente(id_patient).subscribe(()=>{
      this.pacienteService.listarPacientes().subscribe(data=>{
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('Registro eliminado');
      });
    });
  }
}
