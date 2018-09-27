import { createReducer } from 'redux-act'
import * as app from './app'
import { message } from 'antd'

export const REDUCER = 'signup'

export const submit = ({ email, password, fullname, address, company, website }:
  { email: string, password: string, fullname: string, address: string, company: string, website: string }) => (
    dispatch: Function,
    getState: Function,
  ) => {
    dispatch(app.addSubmitForm(REDUCER))
    const state = getState();
    const redirectToRegister = state.auth.get('redirectToRegister')

    let isLoggined
    if (redirectToRegister) {
      //console.log('social signup')
      isLoggined = app.socialSignup(fullname, address, company, website, dispatch, getState)
    } else {
      //console.log('local signup')
      isLoggined = app.signup(email, password, fullname, address, company, website, dispatch, getState)
    }

    if (isLoggined) {
      dispatch(app.deleteSubmitForm(REDUCER))
    } else {
      dispatch(app.deleteSubmitForm(REDUCER))
    }
  }

const initialState = {}
export default createReducer({}, initialState)
