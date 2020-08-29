const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120

function toCell(state, row) {
  return function (_, col) {
    console.log(state.colState[col]);
    const width = getWidth(state.colState, col)
    return `
    <div 
      class="cell"
      contenteditable
      data-type="cell"
      data-col="${col}" 
      data-id="${row}:${col}" 
      style="width: ${width}"
    ></div>`
  }
}

function toColumn({ col, index, width }) {
  return `
    <div 
    class='column' 
    data-type="resizable" 
    data-col="${index}"
    style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, num = '') {
  const resize = num ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${num ? num : ''}
        ${resize}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state = {}, index) {
  // console.log(state[index]);
  return (state[index] || DEFAULT_WIDTH) + 'px'

}

function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    }
  }
}

export const createTable = (rowsCount = 15, state = {}) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    // .map((col, index) => {
    //   const width = getWidth(state.colState, index)
    //   return toColumn(col, index, width)
    // })
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, row))
      .join('')
    rows.push(createRow(cells, row + 1))
  }

  // for (let i = 0; i < rowsCount; i++) {
  //   rows.push(createRow())
  // }

  return rows.join('')
}
