import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/service/paciente.service';
import { Paciente } from 'src/app/model/paciente';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  datasource:MatTableDataSource<Paciente>;
  displayedColumns: string[]=['nombres','apellidos','dni','address','phone','age','gender','acciones'];

  constructor(private pacienteService : PacienteService) { }

  ngOnInit(): void {
    this.pacienteService.listarPacientes().subscribe(data =>{
      this.datasource = new MatTableDataSource(data);
    });
  }
  filtrar(e: any){
    this.datasource.filter = e.target.value.trim().toLowerCase();
  }

}
