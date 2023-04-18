import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ValidatorsService } from "src/app/shared/services/validators.service";
import { MASKS } from "src/app/shared/utils/masks";

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
type IMedicineType = typeof MEDICINE_TYPES[number];

const MEDICINE_UNITS = ["mg", "mcg", "g", "mL", "%"];
type IMedicineUnit = typeof MEDICINE_UNITS[number];

interface IMedicineForm {
  name: FormControl<string | null>;
  date: FormControl<Date | null>;
  time: FormControl<string | null>;
  type: FormControl<IMedicineType | null>;
  amount: FormControl<number | null>;
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
  medicineUnits = MEDICINE_UNITS;

  constructor(
    private route: ActivatedRoute,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((event) => {
      this.isRegistering = event[event.length - 1].path === "register";
      if (!this.isRegistering) {
        // this.populateForm(window.history.state.id);
      }
    });
  }

  deleteAppointment() {}

  save() {
    this.submitted = true;
  }

  private initForm(): FormGroup<IMedicineForm> {
    return new FormGroup<IMedicineForm>({
      name: new FormControl("", {
        validators: [
          this.validatorsService.createRequiredValidator(),
          this.validatorsService.createMinLengthValidator(8),
          this.validatorsService.createMaxLengthValidator(80),
        ],
        updateOn: "submit",
      }),
      date: new FormControl(new Date(), {
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
          this.validatorsService.createEmailValidator(),
          this.validatorsService.createMinLengthValidator(8),
          this.validatorsService.createMaxLengthValidator(8000),
        ],
        updateOn: "submit",
      }),
    });
  }

  private getTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }
}
