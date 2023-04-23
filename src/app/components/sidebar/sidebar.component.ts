import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ConnectionService } from "src/app/shared/services/connection.service";

const OPTIONS = ["NONE", "HOME", "RECORD", "PATIENT", "MEDICINE"] as const;
export type SidebarOptions = typeof OPTIONS[number];

@Component({
  selector: "sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  collapsed = false;
  showRegisterPages = false;
  selectedOption: SidebarOptions = "NONE";

  constructor(
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case "/":
            this.selectedOption = "HOME";
            break;
          case "/record":
            this.selectedOption = "RECORD";
            break;
          case "/patient/register":
            this.selectedOption = "PATIENT";
            break;
          case "/medicine/register":
            this.selectedOption = "MEDICINE";
            break;
          default:
            this.selectedOption = "NONE";
        }
      }
    });
  }

  logout() {
    this.connectionService.logout();
    this.router.navigate(["/login"]);
  }
}
