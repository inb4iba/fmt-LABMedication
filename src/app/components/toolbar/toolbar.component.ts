import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "src/app/shared/services/connection.service";

@Component({
  selector: "toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  user = "Usuário Teste";

  constructor(private connectionService: ConnectionService) {}

  ngOnInit(): void {
    this.user = this.connectionService.getUser();
  }
}
