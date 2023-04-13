import { Component } from "@angular/core";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  register = false;

  constructor(private appComponent: AppComponent) {}

  forgotPassword() {
    this.appComponent.ShowAlert("Funcionalidade em desenvolvimento!", "danger");
  }
}
