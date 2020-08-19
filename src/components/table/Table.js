import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from '../../core/dom'

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }
  static className = 'excel__table'

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $target = $(event.target)
      const $parent = $target.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const cols = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
      const type = $target.data.resize

      const colRes = e => {
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        // $parent.$el.style.width = value + 'px'
        $parent.css({ width: value + "px" })
        cols.forEach(el => el.style.width = value + 'px')
      }

      const rowRes = e => {
        const delta = e.pageY - coords.bottom
        const value = coords.height + delta
        $parent.css({ height: value + 'px' })
      }

      document.onmousemove = e => {
        type === 'col' ? colRes(e) : rowRes(e)
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
    }
  }
}
