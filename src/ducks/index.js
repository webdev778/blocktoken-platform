import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'
import app from './app'
import login from './login'
import auth from './auth'

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  login,
  auth
})
