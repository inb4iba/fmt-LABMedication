import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import {
  AbstractControl,
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
  @Output() closeRegister = new EventEmitter<any>();
  registerForm: FormGroup<FormRegisterProps> = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.min(10), Validators.required]),
    confirm: new FormControl("", [Validators.required]),
  });

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

  // passwordMatches(control: FormControl): ValidatorFn {
  //   console.log(control);
  //   if (this.registerForm.pristine) return;
  //   return this.registerForm.value.password === this.registerForm.value.confirm
  //     ? { deu: "ruim" }
  //     : null;
  // }

  teste() {}
}
