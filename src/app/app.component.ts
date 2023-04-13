import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  isAlertActive = false;
  alertClass = "";
  alertText = "";

  public ShowAlert(text: string, className?: string) {
    this.alertClass = className || "";
    this.alertText = text;
    this.isAlertActive = true;
  }
}
