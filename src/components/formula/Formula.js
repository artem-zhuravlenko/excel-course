import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ['input', 'keydown'],
      ...options
    })
  }
  static className = "excel__formula"

  toHTML() {
    return `
      <div class="info">fx</div>
      <div 
        id="input" 
        class="input" 
        contenteditable="true" 
        spellcheck="false">
       </div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#input')
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })
    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text())
    // })
    this.$subscribe(state => {
      console.log('formula update', state.currentText);
      this.$formula.text(state.currentText)
    })
  }

  onInput(event) {
    const text = event.target.textContent.trim()
    console.log(text);
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}