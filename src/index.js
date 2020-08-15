import { Excel } from '@comp/excel/Excel'
import { Header } from '@comp/header/Header'
import { Toolbar } from '@comp/Toolbar/toolbar'
import { Formula } from '@comp/Formula/formula'
import { Table } from '@comp/Table/table'

import './scss/index.scss'

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
})

excel.render()