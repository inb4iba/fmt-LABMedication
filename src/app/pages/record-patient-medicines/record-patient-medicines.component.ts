import { Component, OnInit } from "@angular/core";
import { IMedicine } from "src/app/shared/services/medicines.service";
import { PatientsService } from "src/app/shared/services/patients.service";

@Component({
  selector: "record-patient-medicines",
  templateUrl: "./record-patient-medicines.component.html",
  styleUrls: ["./record-patient-medicines.component.css"],
})
export class RecordPatientMedicinesComponent implements OnInit {
  id = -1;
  medicines: Array<number> | undefined;

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.id = window.history.state.id;
    this.medicines = this.patientsService.getMedicinesFromPatient(this.id);
  }
}
