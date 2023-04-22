import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { IFieldControlProps } from "src/app/components/input-control/input-control.component";
import {
  ConnectionService,
  IUser,
} from "src/app/shared/services/connection.service";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";

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
  formFields: Array<IFieldControlProps> = [
    { id: "email", type: "email", label: "E-mail" },
    {
      id: "password",
      type: "password",
      label: "Senha",
      forgotPasswordOption: true,
    },
  ];

  constructor(
    private connectionService: ConnectionService,
    private router: Router,
    private toastAlertService: ToastAlertService
  ) {}

  login() {
    const user: IUser = this.loginForm.value satisfies IUser;
    const connectionError: { message: string } | null =
      this.connectionService.login(user);
    if (connectionError)
      return this.toastAlertService.showAlert(
        connectionError.message,
        "danger"
      );
    this.router.navigate(["/"]);
  }
}
