import { Injectable } from "@angular/core";

let patients: Array<IPatient>;
let lastID: number;

export interface IPatient {
  id: number;
  fullname: string;
  gender: string;
  birthdate: string;
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
  healthPlanEndDate?: string;
  address: {
    cep: number;
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
      lastID = 1;
      return;
    }

    const storageObject = JSON.parse(localStorage.getItem("labmed_patients")!);
    patients = storageObject.patients;
    lastID = storageObject.lastID;
  }

  getPatients() {
    return patients;
  }

  getPatientsByInput(input: string): Array<IPatient> {
    return input
      ? patients.filter(
          (patient) =>
            patient.fullname.toLowerCase().includes(input) ||
            patient.email?.toLowerCase().includes(input) ||
            patient.telephone.includes(input)
        )
      : [];
  }

  getPatient(id: number) {
    return patients.find((patient) => patient.id === id);
  }

  generateID() {
    return lastID;
  }

  isUniqueCpf(cpf: string) {
    return !patients.some((patient) => cpf === patient.cpf);
  }

  savePatient(patient: IPatient) {
    lastID++;
    patients.push(patient);
    updatePatients();
  }

  editPatient(editedPatient: IPatient) {
    patients = patients.map((patient) => {
      console.log(patient.id, editedPatient.id);
      return patient.id === editedPatient.id ? editedPatient : patient;
    });
    updatePatients();
  }

  deletePatient(id: number) {
    patients = patients.filter((patient) => patient.id != id);
    updatePatients();
  }
}

function updatePatients() {
  localStorage.setItem(
    "labmed_patients",
    JSON.stringify({
      lastID,
      patients,
    })
  );
}
