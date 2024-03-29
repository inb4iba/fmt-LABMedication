import { Injectable } from "@angular/core";
import { IMedicine } from "./medicines.service";

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
  medicines?: Array<number>;
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

  getTotal() {
    return patients.length;
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

  getSelectedPatient(id: number) {
    const selectedPatient = patients.find((patient) => patient.id === id);
    return { id: selectedPatient!.id, name: selectedPatient!.fullname };
  }

  getMedicinesFromPatient(id: number): Array<number> | undefined {
    return patients.find((patient) => patient.id === id)!.medicines;
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

  saveMedicine(patientID: number, medicineID: number) {
    patients = patients.map((patient) => {
      if (patient.id !== patientID) return patient;
      patient.medicines = patient.medicines
        ? [...patient.medicines, medicineID]
        : [medicineID];
      return patient;
    });
    updatePatients();
  }

  editPatient(editedPatient: IPatient) {
    patients = patients.map((patient) =>
      patient.id === editedPatient.id ? editedPatient : patient
    );
    updatePatients();
  }

  deletePatient(id: number) {
    patients = patients.filter((patient) => patient.id != id);
    updatePatients();
  }

  deleteMedicine(id: number, medicineID: number) {
    patients = patients.map((patient) => {
      patient.medicines =
        patient.id !== id
          ? patient.medicines
          : patient.medicines?.filter((medicine) => medicine !== medicineID);

      return patient;
    });
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
