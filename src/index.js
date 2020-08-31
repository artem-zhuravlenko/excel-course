import { Excel } from '@comp/excel/Excel'
import { Header } from '@comp/header/Header'
import { Toolbar } from '@comp/Toolbar/toolbar'
import { Formula } from '@comp/Formula/formula'
import { Table } from '@comp/Table/table'
import { createStore } from '@core/createStore'
import { rootReducer } from './redux/rootReducer'
import './scss/index.scss'
import { storage, debounce } from './core/utils'
import { initialState } from './redux/initialState'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 300)


store.subscribe(stateListener)

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()