import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToastAlertService {
  alertEmitter = new EventEmitter<{ text: string; className?: string }>();

  showAlert(text: string, className?: string) {
    this.alertEmitter.emit({ text, className });
  }
}
