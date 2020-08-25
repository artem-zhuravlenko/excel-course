import { Excel } from '@comp/excel/Excel'
import { Header } from '@comp/header/Header'
import { Toolbar } from '@comp/Toolbar/toolbar'
import { Formula } from '@comp/Formula/formula'
import { Table } from '@comp/Table/table'
import { createStore } from '@core/createStore'
import { rootReducer } from './redux/rootReducer'

import './scss/index.scss'

const store = createStore(rootReducer, {
  colState: {}
})

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()