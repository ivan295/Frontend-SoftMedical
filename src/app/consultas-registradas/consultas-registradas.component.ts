import { Component, OnInit } from '@angular/core';
import { Consulta } from '../model/consulta';
import { ConsultaService } from '../service/consulta.service';


@Component({
  selector: 'app-consultas-registradas',
  templateUrl: './consultas-registradas.component.html',
  styleUrls: ['./consultas-registradas.component.css']
})
  
export class ConsultasRegistradasComponent implements OnInit {
 consultlist:Consulta[]=[];
 
  constructor(
    private consutlgetserv: ConsultaService
  ) { }

  ngOnInit(): void {
    this.consutlgetserv.listarConsultas().subscribe(response=>{
      this.consultlist=response;
      // console.log(this.consultlist);
    });
    
  }

}
