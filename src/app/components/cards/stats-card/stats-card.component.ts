import { Component, Input } from "@angular/core";

@Component({
  selector: "stats-card",
  templateUrl: "./stats-card.component.html",
  styleUrls: ["./stats-card.component.css"],
})
export class StatsCardComponent {
  @Input() icon = "";
  @Input() text = "";
  @Input() value = "";
}
