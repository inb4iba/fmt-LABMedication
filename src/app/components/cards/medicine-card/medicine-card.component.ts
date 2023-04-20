import { Component, Input, OnInit } from "@angular/core";
import {
  IMedicine,
  MedicinesService,
} from "src/app/shared/services/medicines.service";
import {
  MEDICINE_TYPES_TEXTS,
  IMedicineType,
} from "src/app/pages/medicine/medicine.component";

@Component({
  selector: "medicine-card",
  templateUrl: "./medicine-card.component.html",
  styleUrls: ["./medicine-card.component.css"],
})
export class MedicineCardComponent {
  @Input() medicine: IMedicine | undefined;

  getMedicineType() {
    if (this.medicine) {
      const type = this.medicine.type as IMedicineType;
      return MEDICINE_TYPES_TEXTS[type];
    }

    return undefined;
  }
}
