import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import {
  ConnectionService,
  IUser,
} from "src/app/shared/services/connection.service";

interface IFormLoginProps {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../../app.component.css"],
})
export class LoginComponent {
  register = false;
  loginForm = new FormGroup<IFormLoginProps>({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private appComponent: AppComponent,
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  forgotPassword() {
    this.appComponent.ShowAlert("Funcionalidade em desenvolvimento!", "danger");
  }

  login() {
    const user: IUser = this.loginForm.value satisfies IUser;
    const connectionError: { message: string } | null =
      this.connectionService.login(user);
    if (connectionError)
      return this.appComponent.ShowAlert(connectionError.message, "danger");
    this.router.navigate(["/"]);
  }
}
