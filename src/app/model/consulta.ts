import { Doctor } from "./medico";
import { Paciente } from "./paciente";
import { Speciality } from "./Speciality";

export class Consulta{
    id:number;
    patient:Paciente;
    doctor:Doctor;
    speciality:Speciality;
    num_sala:number;
    
}