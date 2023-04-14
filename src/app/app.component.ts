import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
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
  isLogin = false;
  isAlertActive = false;
  alertInfo: IAlertInfo = {
    className: "",
    text: "",
  };

  constructor(
    private toastAlertService: ToastAlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLogin = event.url === "/login";
      }
    });
    this.subscription = this.toastAlertService.alertObservable.subscribe(() => {
      this.alertInfo = this.toastAlertService.getAlertInfo();
      this.isAlertActive = true;
    });
  }
}
