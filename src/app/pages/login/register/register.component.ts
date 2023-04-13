import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";

interface FormRegisterProps {
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
  registerForm = new FormGroup<FormRegisterProps>({
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
  }
}

function createPasswordMatchesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;
    const password = control.parent.get("password")?.value;
    return control.value !== password ? { teste: 123 } : null;
  };
}
