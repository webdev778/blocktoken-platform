import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'
import { penderReducer } from 'redux-pender'
import app from './app'
import login from './login'
import auth from './auth'
import otp from './otp'

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  pender: penderReducer,
  app,
  login,
  auth,
  otp
})


/* To change to this module for the future
// imports all file except index.js
const req = require.context('.', true, /^(?!.\/index)(?!.\/__tests__).*.js$/);

const modules = { };

req.keys().forEach((key) => {
  const regex = /.\/(.*?).js$/;
  const moduleName = regex.test(key) && key.match(regex)[1];
  modules[moduleName] = req(key).default;
});

modules.routing = routerReducer
modules.pendingTasks = pendingTasksReducer
modules.pender = penderReducer

export default combineReducers(modules);
*/