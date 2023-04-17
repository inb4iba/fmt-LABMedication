import { Component, OnInit } from "@angular/core";
import {
  IPatient,
  PatientsService,
} from "src/app/shared/services/patients.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // patients = [
  //   {
  //     id: 0,
  //     name: "Fábio Lima",
  //     plan: "Unimed",
  //   },
  //   {
  //     id: 1,
  //     name: "Leandro do Carmo",
  //     plan: "Unimed",
  //   },
  //   {
  //     id: 2,
  //     name: "Mathias Santtiago",
  //     plan: "Unimed",
  //   },
  //   {
  //     id: 3,
  //     name: "Calvino Delgado",
  //     plan: "Unimed",
  //   },
  //   {
  //     id: 4,
  //     name: "Jennifer Costa",
  //     plan: "Unimed",
  //   },
  //   {
  //     id: 5,
  //     name: "Valéria Soares",
  //     plan: "Unimed",
  //   },
  // ];
  stats = [
    {
      cardType: "patient",
      value: "89",
    },
    {
      cardType: "medicine",
      value: "32",
    },
  ];
  patients: Array<IPatient> = [];

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patients = this.patientsService.getPatients();
  }
}
