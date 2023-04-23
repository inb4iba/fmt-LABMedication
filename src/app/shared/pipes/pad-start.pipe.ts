import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "padStart",
})
export class PadStartPipe implements PipeTransform {
  transform(value: number, size: string, character: string): string {
    return value.toString().padStart(+size, character);
  }
}
