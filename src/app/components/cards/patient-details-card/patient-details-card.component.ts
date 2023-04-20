import { Component, Input, OnInit } from "@angular/core";
import {
  IPatient,
  PatientsService,
} from "src/app/shared/services/patients.service";
import { MASKS } from "src/app/shared/utils/masks";

@Component({
  selector: "patient-details-card",
  templateUrl: "./patient-details-card.component.html",
  styleUrls: ["./patient-details-card.component.css"],
})
export class PatientDetailsCardComponent implements OnInit {
  @Input() id = -1;
  patient: IPatient | undefined;
  masks = MASKS;

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patient = this.patientsService.getPatient(this.id);
  }
}
