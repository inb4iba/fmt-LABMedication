import { Component, Input, OnInit } from "@angular/core";
import { ConnectionService } from "src/app/shared/services/connection.service";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";

@Component({
  selector: "toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  @Input() pageTitle = "Título da Página";
  user = "Usuário Teste";

  constructor(
    private connectionService: ConnectionService,
    private toastAlertService: ToastAlertService
  ) {}

  ngOnInit(): void {
    this.user = this.connectionService.getUser();
  }

  building() {
    this.toastAlertService.showAlert("Funcionalidade em construção", "danger");
  }
}
