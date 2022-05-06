import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/model/medico';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  datasource:MatTableDataSource<Doctor>;
  displayedColumns: string[]=['nombres','apellidos','dni','cmp','acciones'];
  constructor(
    private medicoService : MedicoService,
    private snackbar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.medicoService.mensajeCambio.subscribe(data=>{
      this.snackbar.open(data,'AVISO',{duration:4000})
    }); 

    this.medicoService.doctorCambio.subscribe(data =>{
      this.datasource = new MatTableDataSource(data);
    });

    this.medicoService.listarMedicos().subscribe(data =>{
      this.datasource = new MatTableDataSource(data);
    });
  }
  filtrar(e: any){
    this.datasource.filter = e.target.value.trim().toLowerCase();
  }
  eliminar(id_doctor:number){
    this.medicoService.eliminarDoctor(id_doctor).subscribe(()=>{
      this.medicoService.listarMedicos().subscribe(data=>{
        this.medicoService.doctorCambio.next(data);
        this.medicoService.mensajeCambio.next('Registro eliminado');
      });
    });
  }

}
