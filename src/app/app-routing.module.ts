import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteComponent } from './pages/paciente/paciente.component';


const routes: Routes = [
  {path: 'paciente', component: PacienteComponent},
  {path: 'medico', component: MedicoComponent},
  {path: 'especialidad', component: EspecialidadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
