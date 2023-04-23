import { Component, Input, OnInit } from "@angular/core";

interface ITypeDetail {
  icon: string;
  text: string;
}

interface ICardTypes {
  patient: ITypeDetail;
  medicine: ITypeDetail;
}

const cardInfos: ICardTypes = {
  patient: {
    icon: "bi-person-badge-fill",
    text: "Pacientes",
  },
  medicine: {
    icon: "bi-prescription2",
    text: "Medicamentos",
  },
};

@Component({
  selector: "stats-card",
  templateUrl: "./stats-card.component.html",
  styleUrls: ["./stats-card.component.css"],
})
export class StatsCardComponent implements OnInit {
  @Input() value = -1;
  @Input() cardType = "";
  text = "";
  icon = "";

  ngOnInit() {
    this.text = cardInfos[this.cardType as keyof ICardTypes].text;
    this.icon = cardInfos[this.cardType as keyof ICardTypes].icon;
  }
}
