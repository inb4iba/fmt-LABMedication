import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastAlertService {
  alertObservable: Observable<boolean> = new Observable<boolean>();
  private _observer: Observer<boolean> | undefined;
  private className: string | undefined;
  private text = "";

  constructor() {
    this.alertObservable = new Observable<boolean>(
      (observer) => (this._observer = observer)
    );
  }

  getAlertInfo() {
    return { className: this.className, text: this.text };
  }

  showAlert(text: string, className?: string) {
    this.className = className;
    this.text = text;
    this._observer?.next(true);
  }
}
