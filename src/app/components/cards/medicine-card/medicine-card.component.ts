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
export class MedicineCardComponent implements OnInit {
  @Input() id = -1;
  medicine: IMedicine | undefined;

  constructor(private medicinesService: MedicinesService) {}

  ngOnInit(): void {
    this.medicine = this.medicinesService.getMedicine(this.id);
  }

  getMedicineType() {
    if (this.medicine) {
      const type = this.medicine.type as IMedicineType;
      return MEDICINE_TYPES_TEXTS[type];
    }

    return undefined;
  }
}
