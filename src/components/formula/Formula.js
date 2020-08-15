// import { ExcelComponent } from "@core/ExcelComponent";
import { ExcelComponent } from "@core/ExcelComponent";


export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: "formula",
      listeners: ['click'],
    })
  }

  static className = "excel__formula"
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `
  }
}