import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "toast-alert",
  templateUrl: "./toast-alert.component.html",
  styleUrls: ["./toast-alert.component.css"],
})
export class ToastAlertComponent implements OnInit {
  endAnimation = false;
  @Input() text = "";
  @Input() className = "";
  @Output() finished = new EventEmitter<any>();

  ngOnInit() {
    document
      .querySelector("#toast")
      ?.addEventListener("animationend", () => this.removeToast());
  }

  removeToast() {
    this.finished.emit();
  }
}
