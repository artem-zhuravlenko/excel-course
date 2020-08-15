const CODES = {
  A: 65,
  Z: 90,
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `
    <div contenteditable class='column'>
      ${col}
    </div>
  `
}

function createRow(content, num = '') {
  return `
    <div class="row">
      <div class="row-info">${num}</div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')
    // cols[0].append(i + 1)
    rows.push(createRow(cells, i + 1))
  }

  // for (let i = 0; i < rowsCount; i++) {
  //   rows.push(createRow())
  // }

  return rows.join('')
}
