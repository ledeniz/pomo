import { createStore, applyMiddleware, compose } from 'redux'
import soundsMiddleware from 'redux-sounds';
import thunk from 'redux-thunk'
import localStore from 'store'

import { soundsData } from '../config'
import { initialData, initialProdData } from './../config'

import reducer from '../reducers/index'

const isProd = process.env.NODE_ENV === 'production'
const middleware = [thunk, soundsMiddleware(soundsData)]
let initialState

if (localStore.get('state')) {
  initialState = localStore.get('state')
} else if (isProd) {
  initialState = initialProdData
} else {
  initialState = initialData
}

if (!isProd) {
  const createLogger = require('redux-logger'),
    logger = createLogger()

  middleware.push(logger)
}

function configureStore () {
  const store = createStore(
    reducer,
    initialState,
    compose (
      applyMiddleware(...middleware),
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

export default configureStore()
