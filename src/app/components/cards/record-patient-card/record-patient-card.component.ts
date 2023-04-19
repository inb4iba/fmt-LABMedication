import { Component, Input } from "@angular/core";

@Component({
  selector: "record-patient-card",
  templateUrl: "./record-patient-card.component.html",
  styleUrls: ["./record-patient-card.component.css"],
})
export class RecordPatientCardComponent {
  @Input() name = "";
  @Input() id = -1;
  @Input() medicinesRecord = 0;
}
