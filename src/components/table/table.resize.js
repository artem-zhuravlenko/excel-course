import { $ } from './../../core/dom'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const cols = $root.findAll(`[data-col="${$parent.data.col}"]`)
    const type = $resizer.data.resize
    const resize = type === 'col' ? 'bottom' : 'right'

    let value

    $resizer.css({
      opacity: 1,
      zIndex: 1000,
      [resize]: '-5000px'
    })

    const colRes = e => {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({ right: -delta + 'px' })
    }

    const rowRes = e => {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({ bottom: -delta + 'px' })
    }

    document.onmousemove = e => {
      type === 'col' ? colRes(e) : rowRes(e)
    }


    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      $parent.css({ width: value + 'px' })

      if (type === 'col') {
        cols.forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({ height: value + 'px' })
      }
      resolve({
        value,
        type,
        // id: type === 'col' ? $parent.data.col : $parent.data.row
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }

  })
}