import { Component, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";

export interface IFieldControlProps {
  id: string;
  label: string;
  type: string;
  forgotPasswordOption?: boolean;
  labelColor?: string;
  errorColor?: string;
}

@Component({
  selector: "input-control",
  templateUrl: "./input-control.component.html",
  styleUrls: ["./input-control.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
})
export class InputControlComponent implements ControlValueAccessor {
  @Input() field: IFieldControlProps = { id: "", label: "", type: "" };
  @Input() form?: FormGroup;
  @Input() submitted?: boolean;
  _value = "";
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private toastAlertService: ToastAlertService) {}

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.onChange(value);
  }

  forgotPassword() {
    this.toastAlertService.showAlert(
      "Funcionalidade em desenvolvimento!",
      "danger"
    );
  }
}
