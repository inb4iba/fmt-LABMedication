import { Injectable } from "@angular/core";

let medicines: Array<IMedicine>;
let lastID: number;

export interface IMedicine {
  id: number;
  patientID: number;
  name: string;
  date: string;
  time: string;
  type: string;
  amount: string;
  unit: string;
  observations: string;
}

@Injectable({
  providedIn: "root",
})
export class MedicinesService {
  constructor() {
    if (!localStorage.getItem("labmed_medicines")) {
      medicines = [];
      lastID = 1;
      return;
    }

    const storageObject = JSON.parse(localStorage.getItem("labmed_medicines")!);
    medicines = storageObject.medicines;
    lastID = storageObject.lastID;
  }

  generateID() {
    return lastID;
  }

  getTotal() {
    return medicines.length;
  }

  getMedicine(id: number): IMedicine | undefined {
    return medicines.find((medicine) => medicine.id === id);
  }

  getPatientId(id: number) {
    return medicines.find((medicine) => medicine.id === id)!.patientID;
  }

  save(medicine: IMedicine) {
    lastID++;
    medicines.push(medicine);
    updateMedicines();
  }

  deleteMedicine(id: number) {
    medicines = medicines.filter((medicine) => medicine.id !== id);
    updateMedicines();
  }
}

function updateMedicines() {
  localStorage.setItem(
    "labmed_medicines",
    JSON.stringify({ medicines, lastID })
  );
}
