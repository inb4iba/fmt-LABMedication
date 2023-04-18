import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "form-management-btns",
  templateUrl: "./form-management.component.html",
  styleUrls: ["./form-management.component.css"],
})
export class FormManagementComponent {
  @Input() isRegistering = true;
  @Output() deleteEmitter = new EventEmitter();

  sendDeleteEvent() {
    this.deleteEmitter.emit();
  }
}
