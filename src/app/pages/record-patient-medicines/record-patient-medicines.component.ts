import { Component, OnInit } from "@angular/core";

@Component({
  selector: "record-patient-medicines",
  templateUrl: "./record-patient-medicines.component.html",
  styleUrls: ["./record-patient-medicines.component.css"],
})
export class RecordPatientMedicinesComponent implements OnInit {
  ngOnInit(): void {
    console.log(window.history.state.id);
  }
}
