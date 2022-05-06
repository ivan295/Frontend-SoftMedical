import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasRegistradasComponent } from './consultas-registradas/consultas-registradas.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { MedicoEdicionComponent } from './pages/medico/medico-edicion/medico-edicion.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';


const routes: Routes = [
  {path: 'paciente', component: PacienteComponent, children:[
    {path: 'nuevo', component: PacienteEdicionComponent},
    {path: 'edicion/:id', component: PacienteEdicionComponent}
  ]
  },
  {path: 'medico', component: MedicoComponent, children:[
    {path: 'nuevo', component: MedicoEdicionComponent},
    {path: 'edicion/:id', component: MedicoEdicionComponent}
  ]
  },
  {path: 'especialidad', component: EspecialidadComponent, children:[
    {path: 'nuevo', component: EspecialidadEdicionComponent},
    {path: 'edicion/:id', component: EspecialidadEdicionComponent}
  ]
  },
  {path:'consulta',component: ConsultaComponent},
  {path:'consulta_registradas',component: ConsultasRegistradasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
