import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from '../../core/dom'
import { shouldResize, isCell, matrix, nextSelector } from "./table.functions";
import { resizeHandler } from "./table.resize";
import { TableSelection } from "./TableSelection";
import { range } from './table.functions';

export class Table extends ExcelComponent {

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  static className = 'excel__table'

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      const unsub = this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$subscribe(state => {
      console.log('Table state ', state);
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    this.$dispatch({ type: 'TEST' })
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch({ type: 'TABLE_RESIZE', data })
      console.log(data);
    } catch (error) {
      console.warn(error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'ArrowLeft',
      'Tab',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ]

    const { key } = event

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
