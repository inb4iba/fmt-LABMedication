import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css", "../../app.component.css"],
})
export class SearchInputComponent {
  @Output() getInputValue = new EventEmitter<string>();
  input = "";

  passInput() {
    this.getInputValue.emit(this.input);
  }
}
