import { createReducer } from 'redux-act'
import * as app from './app'
import { message } from 'antd'

export const REDUCER = 'signup'

export const submit = ({ displayName, email, password }: { displayName: string, email: string, password: string }) => (
  dispatch: Function,
  getState: Function,
) => {
  dispatch(app.addSubmitForm(REDUCER))
  console.log(displayName + ", " + email + ", " + password);
  const state = getState();
  const redirectToRegister = state.auth.get('redirectToRegister')
  
  let isLoggined
  if(redirectToRegister) {
    console.log('social signup')
    isLoggined = app.socialSignup(displayName, dispatch, getState)
  }else{
    console.log('local signup')
    isLoggined = app.signup(displayName, email, password, dispatch)
  }

  if (isLoggined) {
    dispatch(app.deleteSubmitForm(REDUCER))
  } else {
    dispatch(app.deleteSubmitForm(REDUCER))
  }
}

const initialState = {}
export default createReducer({}, initialState)
