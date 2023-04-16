import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastAlertService } from "src/app/shared/services/toast-alert.service";
import { ViaCEPService } from "src/app/shared/services/via-cep.service";

@Component({
  selector: "patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.css"],
})
export class PatientComponent implements OnInit {
  isRegistering = true;

  constructor(
    private route: ActivatedRoute,
    private toastAlertService: ToastAlertService,
    private viaCepService: ViaCEPService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((event) => {
      this.isRegistering = event[event.length - 1].path === "register";
    });
  }

  getAddress() {
    this.viaCepService.getAddressFromCEP("").subscribe((res) => {
      // fill address fields
    });
  }

  save() {
    this.toastAlertService.showAlert("Dados salvos!", "success");
  }
}
