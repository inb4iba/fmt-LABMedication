import { Component, OnInit } from "@angular/core";

@Component({
  selector: "record-patient-medicines",
  templateUrl: "./record-patient-medicines.component.html",
  styleUrls: ["./record-patient-medicines.component.css"],
})
export class RecordPatientMedicinesComponent implements OnInit {
  id = -1;

  ngOnInit(): void {
    this.id = window.history.state.id;
  }
}
