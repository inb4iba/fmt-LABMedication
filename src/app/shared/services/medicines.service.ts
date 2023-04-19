import { Injectable } from "@angular/core";

let medicines: Array<IMedicine>;
let lastID: number;

export interface IMedicine {
  id: number;
  name: string;
  date: Date;
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

  save(medicine: IMedicine) {
    lastID++;
    medicines.push(medicine);
    localStorage.setItem(
      "labmed_medicines",
      JSON.stringify({ medicines, lastID })
    );
  }
}
