import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "medicine-patient-card",
  templateUrl: "./medicine-patient-card.component.html",
  styleUrls: ["./medicine-patient-card.component.css"],
})
export class MedicinePatientCardComponent {
  @Input() name = "";
  @Input() id = -1;
  @Output() getPatient = new EventEmitter<{ id: number; name: string }>();

  passPatient() {
    this.getPatient.emit({ name: this.name, id: this.id });
  }
}
