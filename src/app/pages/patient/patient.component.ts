import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";

@Component({
  selector: "patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.css"],
})
export class PatientComponent implements OnInit {
  isRegistering = true;

  constructor(
    private route: ActivatedRoute,
    private toastAlertService: ToastAlertService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((event) => {
      this.isRegistering = event[event.length - 1].path === "register";
    });
  }

  save() {
    this.toastAlertService.showAlert("Dados salvos!", "success");
  }
}
