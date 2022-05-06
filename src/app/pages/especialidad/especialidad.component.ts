import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Speciality } from 'src/app/model/Speciality';
import { EspecialidadService } from 'src/app/service/especialidad.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  datasource:MatTableDataSource<Speciality>;
  displayedColumns: string[]=['especialidad','acciones'];

  constructor( 
  private specialityserv : EspecialidadService,
    private snackbar:MatSnackBar
    ){ }
  ngOnInit(): void {
    this.specialityserv.mensajeCambio.subscribe(data=>{
      this.snackbar.open(data,'AVISO',{duration:4000})
    }); 

    this.specialityserv.specialityCambio.subscribe(data =>{
      this.datasource = new MatTableDataSource(data);
    });

    this.specialityserv.listarEspecialidad().subscribe(data =>{
      this.datasource = new MatTableDataSource(data);
    });
  }
  filtrar(e: any){
    this.datasource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(id_speciality:number){
    this.specialityserv.eliminarSpeciality(id_speciality).subscribe(()=>{
      this.specialityserv.listarEspecialidad().subscribe(data=>{
        this.specialityserv.specialityCambio.next(data);
        this.specialityserv.mensajeCambio.next('Registro eliminado');
      });
    });
  }

}
