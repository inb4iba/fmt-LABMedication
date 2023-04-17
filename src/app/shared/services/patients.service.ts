import { Injectable } from "@angular/core";

let patients: Array<IPatient>;

export interface IPatient {
  id: number;
  fullname: string;
  gender: string;
  birthdate: Date;
  cpf: string;
  rg: string;
  civilState: string;
  telephone: string;
  email?: string;
  placeOfBirth: string;
  emergencyTelephone: string;
  allergies?: string;
  specialCare?: string;
  healthPlan?: string;
  healthPlanNumber?: string;
  healthPlanEndDate?: Date;
  address: {
    cep: number | string;
    city: string;
    state: string;
    street: string;
    street2?: string;
    number: string;
    district: string;
    reference?: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class PatientsService {
  constructor() {
    if (!localStorage.getItem("labmed_patients")) {
      patients = new Array<IPatient>();
      return;
    }

    patients = JSON.parse(
      localStorage.getItem("labmed_patients")!
    ) satisfies Array<IPatient>;
  }

  generateID() {
    return patients.length + 1;
  }

  isUniqueCpf(cpf: string) {
    return !patients.some((patient) => cpf === patient.cpf);
  }

  savePatient(patient: IPatient) {
    patients.push(patient);
    localStorage.setItem("labmed_patients", JSON.stringify(patients));
  }

  editPatient(editedPatient: IPatient) {
    patients = patients.map((patient) =>
      patient.id === editedPatient.id ? editedPatient : patient
    );
    localStorage.setItem("labmed_patients", JSON.stringify(patients));
  }
}
