import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { combineReducers, createStore } from 'redux'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import imagesReducer from './reducers/images'
import breedReducer from './reducers/breed'
import sidebarReducer from './reducers/sidebar'

const store = createStore(
  combineReducers({
  	images: imagesReducer,
  	selectedBreed: breedReducer,
  	sidebarState: sidebarReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
