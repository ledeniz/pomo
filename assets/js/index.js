import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import configureStore from './store/configure-store'
import { initialState } from './config'

const store = configureStore(initialState)

render (
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
)
