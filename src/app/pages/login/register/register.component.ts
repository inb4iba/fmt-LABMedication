import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import {
  ConnectionService,
  IUser,
} from "src/app/shared/services/connection.service";

interface IFormRegisterProps {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirm: FormControl<string | null>;
}

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  showing = false;
  submitted = false;
  @Output() closeRegister = new EventEmitter<any>();
  registerForm = new FormGroup<IFormRegisterProps>({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
      updateOn: "submit",
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(10)],
      updateOn: "submit",
    }),
    confirm: new FormControl("", {
      validators: [Validators.required, createPasswordMatchesValidator()],
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
    private appComponent: AppComponent,
    private connectionService: ConnectionService
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
    if (this.registerForm.valid) {
      const user: IUser = {
        email: this.registerForm.get("email")?.value!,
        password: this.registerForm.get("password")?.value!,
      };
      this.connectionService.registerUser(user);
      this.goToLogin();
      this.appComponent.ShowAlert("Usuário cadastrado com sucesso!");
    }
  }
}

function createPasswordMatchesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;
    const password = control.parent.get("password")?.value;
    return control.value !== password ? { noMatch: "Senha diferente." } : null;
  };
}
