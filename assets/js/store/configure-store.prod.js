import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import soundsMiddleware from 'redux-sounds'

import rootReducer from '../reducers/index'
import { soundsData } from '../config'

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, soundsMiddleware(soundsData))
  )
}
