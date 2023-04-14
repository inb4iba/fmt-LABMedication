import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectionService } from "src/app/shared/services/connection.service";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";

@Component({
  selector: "sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  collapsed = false;
  showRegisterPages = false;

  constructor(
    private toastAlertService: ToastAlertService,
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  logout() {
    this.connectionService.logout();
    this.router.navigate(["/login"]);
  }

  building() {
    this.toastAlertService.showAlert("Página em construção", "danger");
  }
}
