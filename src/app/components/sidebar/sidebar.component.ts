import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectionService } from "src/app/shared/services/connection.service";

@Component({
  selector: "sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  collapsed = true;

  constructor(
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  logout() {
    this.connectionService.logout();
    this.router.navigate(["/login"]);
  }
}
