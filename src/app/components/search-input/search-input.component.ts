import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css", "../../app.component.css"],
})
export class SearchInputComponent {
  @Output() getInputValue = new EventEmitter<string>();
  input = "";
  timeoutHandler: any;

  passInput() {
    if (this.timeoutHandler) clearTimeout(this.timeoutHandler);
    this.timeoutHandler = setTimeout(
      () => this.getInputValue.emit(this.input),
      800
    );
  }
}
