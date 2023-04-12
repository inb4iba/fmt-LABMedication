import { Component, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  showing = false;
  @Output() closeRegister = new EventEmitter<any>();

  ngOnInit() {
    setTimeout(() => {
      this.showing = true;
    }, 0);
  }

  goToLogin() {
    this.showing = false;
    setTimeout(() => {
      this.closeRegister.emit();
    }, 700);
  }
}
