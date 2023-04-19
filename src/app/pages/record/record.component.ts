import { Component, OnInit } from "@angular/core";
import {
  IPatient,
  PatientsService,
} from "src/app/shared/services/patients.service";

@Component({
  selector: "record",
  templateUrl: "./record.component.html",
  styleUrls: ["./record.component.css"],
})
export class RecordComponent implements OnInit {
  patients: Array<IPatient>;

  constructor(private patientsService: PatientsService) {
    this.patients = patientsService.getPatients();
  }

  ngOnInit(): void {
    this.patients = this.patientsService.getPatients();
  }
}
