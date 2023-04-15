import { Component, Input } from "@angular/core";

@Component({
  selector: "patient-card",
  templateUrl: "./patient-card.component.html",
  styleUrls: ["./patient-card.component.css"],
})
export class PatientCardComponent {
  @Input() name = "";
  @Input() plan = "";
  @Input() id = -1;
}
