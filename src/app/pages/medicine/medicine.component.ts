import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  IMedicine,
  MedicinesService,
} from "src/app/shared/services/medicines.service";
import {
  IPatient,
  PatientsService,
} from "src/app/shared/services/patients.service";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";
import { ValidatorsService } from "src/app/shared/services/validators.service";
import { MASKS } from "src/app/shared/utils/masks";

export const MEDICINE_TYPES_TEXTS = {
  CAPSULE: "Capsula",
  PILL: "Comprimido",
  LIQUID: "Líquido",
  CREAM: "Creme",
  GEL: "Gel",
  SPRAY: "Spray",
  INJECTION: "Injeção",
  INHALATION: "Inalação",
} as const;
const MEDICINE_TYPES = [
  "CAPSULE",
  "PILL",
  "LIQUID",
  "CREAM",
  "GEL",
  "SPRAY",
  "INJECTION",
  "INHALATION",
] as const;

export type IMedicineType = typeof MEDICINE_TYPES[number];

const MEDICINE_UNITS = ["mg", "mcg", "g", "mL", "%"];
type IMedicineUnit = typeof MEDICINE_UNITS[number];

let medicine: IMedicine | undefined;

interface IMedicineForm {
  name: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  type: FormControl<IMedicineType | null>;
  amount: FormControl<string | null>;
  unit: FormControl<IMedicineUnit | null>;
  observations: FormControl<string | null>;
}

@Component({
  selector: "medicine",
  templateUrl: "./medicine.component.html",
  styleUrls: ["./medicine.component.css"],
})
export class MedicineComponent implements OnInit {
  submitted = false;
  isRegistering = true;
  masks = MASKS;
  medicineForm = this.initForm();
  medicineTypes = MEDICINE_TYPES;
  medicineTypesTexts = MEDICINE_TYPES_TEXTS;
  medicineUnits = MEDICINE_UNITS;
  patients: Array<IPatient> | undefined;
  selectedPatient: { id: number; name: string } | undefined;

  constructor(
    private route: ActivatedRoute,
    private validatorsService: ValidatorsService,
    private toastAlertService: ToastAlertService,
    private medicinesService: MedicinesService,
    private patientsService: PatientsService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((event) => {
      this.isRegistering = event[event.length - 1].path === "register";
      if (!this.isRegistering) {
        this.selectedPatient = this.patientsService.getSelectedPatient(
          this.medicinesService.getPatientId(window.history.state.id)
        );
        this.populateForm(window.history.state.id);
      }
    });
  }

  deleteMedicine() {
    this.medicinesService.deleteMedicine(medicine!.id);
    this.patientsService.deleteMedicine(this.selectedPatient!.id, medicine!.id);
    this.isRegistering = true;
    this.selectedPatient = undefined;
  }

  save() {
    this.submitted = true;

    if (!this.medicineForm.valid)
      return this.toastAlertService.showAlert("Campos inválidos.", "danger");

    medicine = this.createMedicine(!!medicine);

    if (this.isRegistering) {
      this.medicinesService.save(medicine);
      this.patientsService.saveMedicine(this.selectedPatient!.id, medicine.id);
      this.clearForm();
    } else {
      this.medicinesService.editMedicine(medicine);
    }

    this.toastAlertService.showAlert(
      this.isRegistering
        ? "Medicamento cadastrado com sucesso."
        : "Dados salvos.",
      "success"
    );
  }

  updateAmountValue(e: any) {
    const value = +e.target.value;
    this.medicineForm.get("amount")?.setValue(value.toFixed(2));
  }

  searchPatient(input: string) {
    this.patients = this.patientsService.getPatientsByInput(input);
  }

  selectPatient(patientInfo: { id: number; name: string }) {
    this.selectedPatient = patientInfo;
  }

  private createMedicine(isEdit: boolean): IMedicine {
    return {
      id: isEdit ? medicine!.id : this.medicinesService.generateID(),
      patientID: this.selectedPatient!.id,
      name: this.medicineForm.get("name")?.value || "",
      date: this.medicineForm.get("date")?.value || "",
      time: this.medicineForm.get("time")?.value || "",
      type: this.medicineForm.get("type")?.value || "",
      amount: this.medicineForm.get("amount")?.value || "",
      unit: this.medicineForm.get("unit")?.value || "",
      observations: this.medicineForm.get("observations")?.value || "",
    };
  }

  private clearForm() {
    this.submitted = false;
    medicine = undefined;
    this.medicineForm.reset();

    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - timeZoneOffset)
      .toISOString()
      .substring(0, 10);

    this.medicineForm.get("date")?.setValue(today);
    this.medicineForm.get("time")?.setValue(this.getTime());
  }

  private initForm(): FormGroup<IMedicineForm> {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - timeZoneOffset)
      .toISOString()
      .substring(0, 10);

    return new FormGroup<IMedicineForm>({
      name: new FormControl("", {
        validators: [
          this.validatorsService.createRequiredValidator(),
          this.validatorsService.createMinLengthValidator(8),
          this.validatorsService.createMaxLengthValidator(80),
        ],
        updateOn: "submit",
      }),
      date: new FormControl(today, {
        validators: [
          this.validatorsService.createRequiredValidator(),
          this.validatorsService.createDateValidator(),
        ],
        updateOn: "submit",
      }),
      time: new FormControl(this.getTime(), {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      type: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      amount: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      unit: new FormControl(null, {
        validators: [this.validatorsService.createRequiredValidator()],
        updateOn: "submit",
      }),
      observations: new FormControl(null, {
        validators: [
          this.validatorsService.createRequiredValidator(),
          this.validatorsService.createMinLengthValidator(8),
          this.validatorsService.createMaxLengthValidator(8000),
        ],
        updateOn: "submit",
      }),
    });
  }

  private populateForm(id: number) {
    medicine = this.medicinesService.getMedicine(id);

    this.medicineForm.get("name")?.setValue(medicine?.name || "");
    this.medicineForm.get("date")?.setValue(medicine?.date || "");
    this.medicineForm.get("time")?.setValue(medicine?.time || "");
    this.medicineForm
      .get("type")
      ?.setValue((medicine?.type as IMedicineType) || "CAPSULE");
    this.medicineForm.get("amount")?.setValue(medicine?.amount || "");
    this.medicineForm.get("unit")?.setValue(medicine?.unit || "");
    this.medicineForm
      .get("observations")
      ?.setValue(medicine?.observations || "");
  }

  private getTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }
}
