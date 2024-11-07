import { configureStore } from '@reduxjs/toolkit'

import aviaReducer from './aviaSlices'

const store = configureStore({
  reducer: {
    avia: aviaReducer,
  },
})

export default store
