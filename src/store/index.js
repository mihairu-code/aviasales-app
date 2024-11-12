import { configureStore } from '@reduxjs/toolkit'

import { saveState, loadState } from '../utility.js'

import aviaReducer from './aviaSlices'

localStorage.clear()

// const persistedState = loadState()

const store = configureStore({
  reducer: {
    avia: aviaReducer,
  },
  // preloadedState: persistedState,
})

store.subscribe(() => {
  saveState({
    avia: store.getState().avia,
  })
})

export default store
