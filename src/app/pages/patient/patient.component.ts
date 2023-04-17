import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  IPatient,
  PatientsService,
} from "src/app/shared/services/patients.service";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";
import { ValidatorsService } from "src/app/shared/services/validators.service";
import { ViaCEPService } from "src/app/shared/services/via-cep.service";
import { MASKS } from "src/app/shared/utils/masks";

let patient: IPatient;

interface IPatientForm {
  fullname: FormControl<string | null>;
  gender: FormControl<string | null>;
  birthdate: FormControl<Date | null>;
  cpf: FormControl<string | null>;
  rg: FormControl<string | null>;
  civilState: FormControl<string | null>;
  telephone: FormControl<string | null>;
  email: FormControl<string | null>;
  placeOfBirth: FormControl<string | null>;
  emergencyTelephone: FormControl<string | null>;
  allergies: FormControl<string | null>;
  specialCare: FormControl<string | null>;
  healthPlan: FormControl<string | null>;
  healthPlanNumber: FormControl<string | null>;
  healthPlanEndDate: FormControl<Date | null>;
  cep: FormControl<number | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  street: FormControl<string | null>;
  street2: FormControl<string | null>;
  number: FormControl<string | null>;
  district: FormControl<string | null>;
  reference: FormControl<string | null>;
}

@Component({
  selector: "patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.css"],
})
export class PatientComponent implements OnInit {
  submitted = false;
  isRegistering = true;
  patientForm = this.initFormGroup();
  masks = MASKS;

  constructor(
    private route: ActivatedRoute,
    private toastAlertService: ToastAlertService,
    private validatorsService: ValidatorsService,
    private patientsService: PatientsService,
    private viaCepService: ViaCEPService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((event) => {
      this.isRegistering = event[event.length - 1].path === "register";
    });
  }

  getAddress() {
    if (this.patientForm.controls.cep.valid)
      this.viaCepService
        .getAddressFromCEP(this.patientForm.controls.cep.value!)
        .subscribe((res) => {
          if (res.logradouro) {
            this.patientForm.controls.street.setValue(res.logradouro);
            this.patientForm.controls.street.disable();
          }
          if (res.complemento) {
            this.patientForm.controls.street2.setValue(res.complemento);
            this.patientForm.controls.street2.disable();
          }
          if (res.bairro) {
            this.patientForm.controls.district.setValue(res.bairro);
            this.patientForm.controls.district.disable();
          }
          if (res.logradouro) {
            this.patientForm.controls.city.setValue(res.localidade);
            this.patientForm.controls.city.disable();
          }
          if (res.logradouro) {
            this.patientForm.controls.state.setValue(res.uf);
            this.patientForm.controls.state.disable();
          }
        });
  }

  initFormGroup() {
    return new FormGroup<IPatientForm>({
      fullname: new FormControl("", {
        validators: [
          this.validatorsService.createRequiredValidator(),
          this.validatorsService.createMinLengthValidator(4),
          this.validatorsService.createMaxLengthValidator(80),
        ],
        updateOn: "submit",
      }),
      gender: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      birthdate: new FormControl(null, {
        validators: [
          this.validatorsService.createRequiredValidator(),
          this.validatorsService.createDateValidator(),
        ],
        updateOn: "submit",
      }),
      cpf: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      rg: new FormControl(null, {
        validators: [
          this.validatorsService.createRequiredValidator(),
          this.validatorsService.createMaxLengthValidator(20),
        ],
        updateOn: "submit",
      }),
      civilState: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      telephone: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      email: new FormControl(null, {
        validators: [this.validatorsService.createEmailValidator()],
        updateOn: "submit",
      }),
      placeOfBirth: new FormControl(null, {
        validators: [
          this.validatorsService.createRequiredValidator(),
          this.validatorsService.createMinLengthValidator(5),
          this.validatorsService.createMaxLengthValidator(100),
        ],
        updateOn: "submit",
      }),
      emergencyTelephone: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      allergies: new FormControl(),
      specialCare: new FormControl(),
      healthPlan: new FormControl(),
      healthPlanNumber: new FormControl(),
      healthPlanEndDate: new FormControl(),
      cep: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
      }),
      city: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      district: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      number: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      reference: new FormControl(),
      state: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      street: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      street2: new FormControl(),
    });
  }

  save() {
    this.submitted = true;

    if (!this.patientForm.valid)
      return this.toastAlertService.showAlert("Campos inválidos", "danger");

    patient = patient ? patient : this.createPatient();

    if (this.patientsService.isUniqueCpf(patient.cpf) && this.isRegistering)
      this.patientsService.savePatient(patient);
    else if (!this.isRegistering) this.patientsService.editPatient(patient);

    this.toastAlertService.showAlert(
      this.isRegistering ? "Paciente cadastrado!" : "Dados salvos!",
      "success"
    );
  }

  private createPatient(): IPatient {
    return {
      id: this.patientsService.generateID(),
      fullname: this.patientForm.get("fullname")?.value || "",
      gender: this.patientForm.get("gender")?.value || "",
      birthdate: new Date(
        this.patientForm.get("birthdate")?.value || Date.now()
      ),
      cpf: this.patientForm.get("cpf")?.value || "",
      rg: this.patientForm.get("rg")?.value || "",
      civilState: this.patientForm.get("civilState")?.value || "",
      telephone: this.patientForm.get("telephone")?.value || "",
      email: this.patientForm.get("email")?.value || undefined,
      placeOfBirth: this.patientForm.get("placeOfBirth")?.value || "",
      emergencyTelephone:
        this.patientForm.get("emergencyTelephone")?.value || "",
      allergies: this.patientForm.get("allergies")?.value || "",
      specialCare: this.patientForm.get("specialCare")?.value || "",
      healthPlan: this.patientForm.get("healthPlan")?.value || "",
      healthPlanNumber: this.patientForm.get("healthPlanNumber")?.value || "",
      healthPlanEndDate: new Date(
        this.patientForm.get("healthPlanEndDate")?.value || Date.now()
      ),
      address: {
        cep: this.patientForm.get("cep")?.value || "",
        city: this.patientForm.get("city")?.value || "",
        state: this.patientForm.get("state")?.value || "",
        district: this.patientForm.get("district")?.value || "",
        number: this.patientForm.get("number")?.value || "",
        street: this.patientForm.get("street")?.value || "",
        street2: this.patientForm.get("street2")?.value || "",
        reference: this.patientForm.get("reference")?.value || "",
      },
    };
  }
}
