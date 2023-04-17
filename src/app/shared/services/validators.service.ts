import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ConnectionService } from "./connection.service";

@Injectable({
  providedIn: "root",
})
export class ValidatorsService {
  constructor(private connectionService: ConnectionService) {}

  createRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value ? { errorMsg: "Campo obrigatório." } : null;
    };
  }

  createDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const now = Date.now();
      const date = new Date(control.value);
      return date.getTime() > now ? { errorMsg: "Data inválida." } : null;
    };
  }

  createEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      console.log(regex.test(control.value), control.value);
      return !regex.test(control.value)
        ? { errorMsg: "E-mail inválido." }
        : null;
    };
  }

  createMinLengthValidator(value: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return control.value.length < value
        ? { errorMsg: `Precisa ter pelo menos ${value} caracteres.` }
        : null;
    };
  }

  createMaxLengthValidator(value: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return control.value.length > value
        ? { errorMsg: `Ultrapassou o limite de ${value} caracteres.` }
        : null;
    };
  }

  createUniqueUserValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return !this.connectionService.isUniqueUser(control.value)
        ? { errorMsg: "E-mail já cadastrado." }
        : null;
    };
  }

  createPasswordMatchesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;
      const password = control.parent.get("password")?.value;
      return control.value !== password
        ? { errorMsg: "Senha diferente." }
        : null;
    };
  }
}
