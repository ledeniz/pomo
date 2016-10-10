import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import localStore from 'store'

import store from './store/index'
import { pauseTimer } from './actions/index'

import App from './containers/App.jsx'

store.subscribe(() => {
  localStore.set('state', store.getState())
})

window.onbeforeunload = () => {
  store.dispatch(pauseTimer(store.getState().intervalId))
}

render (
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
)
