import { Component, OnInit } from "@angular/core";
import { ToastAlertService } from "./shared/services/toast-alert.service";

interface IAlertInfo {
  text: string;
  className: string | undefined;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  subscription: any;
  isAlertActive = false;
  alertInfo: IAlertInfo = {
    className: "",
    text: "",
  };

  constructor(private toastAlertService: ToastAlertService) {}

  ngOnInit() {
    this.subscription = this.toastAlertService.alertObservable.subscribe(() => {
      this.alertInfo = this.toastAlertService.getAlertInfo();
      this.isAlertActive = true;
    });
  }
}
