import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IFieldControlProps } from "src/app/components/input-control/input-control.component";
import {
  ConnectionService,
  IUser,
} from "src/app/shared/services/connection.service";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";
import { ValidatorsService } from "src/app/shared/services/validators.service";

interface IFormRegisterProps {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirm: FormControl<string | null>;
}

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css", "../../../app.component.css"],
})
export class RegisterComponent implements OnInit {
  showing = false;
  submitted = false;
  @Output() closeRegister = new EventEmitter<any>();
  formFields: Array<IFieldControlProps> = [
    {
      id: "email",
      type: "email",
      label: "E-mail",
      labelColor: "text-zinc-100",
      errorColor: "text-zinc-900",
    },
    {
      id: "password",
      type: "password",
      label: "Senha",
      labelColor: "text-zinc-100",
      errorColor: "text-zinc-900",
    },
    {
      id: "confirm",
      type: "password",
      label: "Confirmar senha",
      labelColor: "text-zinc-100",
      errorColor: "text-zinc-900",
    },
  ];

  registerForm = new FormGroup<IFormRegisterProps>({
    email: new FormControl("", {
      validators: [
        this.validatorsService.createRequiredValidator(),
        this.validatorsService.createEmailValidator(),
        this.validatorsService.createUniqueUserValidator(),
      ],
      updateOn: "submit",
    }),
    password: new FormControl("", {
      validators: [
        this.validatorsService.createRequiredValidator(),
        this.validatorsService.createMinLengthValidator(10),
      ],
      updateOn: "submit",
    }),
    confirm: new FormControl("", {
      validators: [
        this.validatorsService.createRequiredValidator(),
        this.validatorsService.createPasswordMatchesValidator(),
      ],
      updateOn: "submit",
    }),
  });

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get confirm() {
    return this.registerForm.get("confirm");
  }

  constructor(
    private toastAlertService: ToastAlertService,
    private connectionService: ConnectionService,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.showing = true;
    }, 0);
  }

  goToLogin() {
    this.showing = false;
    setTimeout(() => {
      this.closeRegister.emit();
    }, 700);
  }

  register() {
    this.submitted = true;
    console.log(this.email?.errors);
    if (this.registerForm.valid) {
      const user: IUser = {
        email: this.registerForm.get("email")?.value!,
        password: this.registerForm.get("password")?.value!,
      };
      this.connectionService.registerUser(user);
      this.goToLogin();
      this.toastAlertService.showAlert("Usuário cadastrado com sucesso!");
    }
  }
}
