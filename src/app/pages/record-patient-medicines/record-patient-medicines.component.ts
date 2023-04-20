import { Component, OnInit } from "@angular/core";
import {
  IMedicine,
  MedicinesService,
} from "src/app/shared/services/medicines.service";
import { PatientsService } from "src/app/shared/services/patients.service";

@Component({
  selector: "record-patient-medicines",
  templateUrl: "./record-patient-medicines.component.html",
  styleUrls: ["./record-patient-medicines.component.css"],
})
export class RecordPatientMedicinesComponent implements OnInit {
  id = -1;
  medicines: Array<IMedicine> | undefined;

  constructor(
    private patientsService: PatientsService,
    private medicinesService: MedicinesService
  ) {}

  ngOnInit(): void {
    this.id = window.history.state.id;
    const medicinesIDs = this.patientsService.getMedicinesFromPatient(this.id);
    if (medicinesIDs && medicinesIDs.length) {
      this.medicines = [];
      medicinesIDs.forEach((medicineID) => {
        const medicine: IMedicine =
          this.medicinesService.getMedicine(medicineID)!;
        this.medicines?.push(medicine);
      });
      this.sortMedicines();
    }
  }

  private sortMedicines() {
    this.medicines?.sort((a, b) => {
      const aDate = new Date(`${a.date}T${a.time}`);
      const bDate = new Date(`${b.date}T${b.time}`);
      return aDate.getTime() - bDate.getTime();
    });
  }
}
