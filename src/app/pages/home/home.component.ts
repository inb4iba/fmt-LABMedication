import { Component, OnInit } from "@angular/core";
import { MedicinesService } from "src/app/shared/services/medicines.service";
import {
  IPatient,
  PatientsService,
} from "src/app/shared/services/patients.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  stats: Array<{ cardType: string; value: number }> = [];
  patients: Array<IPatient> = [];
  filteredPatients: Array<IPatient> = [];

  constructor(
    private patientsService: PatientsService,
    private medicinesService: MedicinesService
  ) {}

  ngOnInit(): void {
    this.patients = this.patientsService.getPatients();
    this.stats.push(
      {
        cardType: "patient",
        value: this.patientsService.getTotal(),
      },
      {
        cardType: "medicine",
        value: this.medicinesService.getTotal(),
      }
    );
  }

  filterPatients(input: string) {
    this.filteredPatients = this.patientsService.getPatientsByInput(input);
  }
}
