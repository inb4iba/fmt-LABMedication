import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ToastAlertService } from "./shared/services/toast-alert.service";
import { Title } from "@angular/platform-browser";

interface IAlertInfo {
  text: string;
  className?: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "";
  isLogin = false;
  isAlertActive = false;
  alertInfo: IAlertInfo = {
    className: "",
    text: "",
  };

  constructor(
    private toastAlertService: ToastAlertService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          const { name } = window.history.state;
          this.title = name
            ? `${this.titleService.getTitle()} - ${name}`
            : this.titleService.getTitle();
          this.titleService.setTitle(this.title + " - LABMedicamentos");
        }, 0);
        this.isLogin = event.url === "/login";
      }
    });

    this.toastAlertService.alertEmitter.subscribe((alert) => {
      this.alertInfo = alert;
      this.isAlertActive = true;
    });
  }
}
