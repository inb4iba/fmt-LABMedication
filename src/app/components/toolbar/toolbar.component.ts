import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { ConnectionService } from "src/app/shared/services/connection.service";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";

@Component({
  selector: "toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  user = "Usuário Teste";
  title = "";

  constructor(
    private connectionService: ConnectionService,
    private toastAlertService: ToastAlertService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.user = this.connectionService.getUser();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          const { name } = window.history.state;
          this.title = name
            ? `${this.titleService.getTitle()} - ${name}`
            : this.titleService.getTitle();
          this.titleService.setTitle(this.title + " - LABMedicamentos");
        }, 0);
      }
    });
  }

  building() {
    this.toastAlertService.showAlert("Funcionalidade em construção", "danger");
  }
}
