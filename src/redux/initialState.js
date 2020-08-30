import { storage } from "../core/utils"

export const defaultStete = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: ''
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultStete