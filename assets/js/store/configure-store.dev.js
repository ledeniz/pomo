import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import soundsMiddleware from 'redux-sounds';

import rootReducer from '../reducers/index'
import { soundsData } from '../config'

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(thunk, createLogger(), soundsMiddleware(soundsData)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      const nextReducer = require('../reducers/index').default

      store.replaceReducer(nextReducer)
    })
  }

  return store
}
