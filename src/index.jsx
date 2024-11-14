import React, { StrictMode } from 'react'
import 'typeface-open-sans'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import store from '/store/store.js'

import './index.less'
import Aviasales from './Components/Aviasales/Aviasales.jsx'

const rootElement = document.querySelector('.root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <StrictMode>
      <Aviasales />
    </StrictMode>
  </Provider>
)
