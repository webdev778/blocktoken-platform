import { createReducer } from 'redux-act'
import * as app from './app'
import { message } from 'antd'

export const REDUCER = 'login'

export const submit = ({ email, password }: { email: string, password: string }) => (
  dispatch: Function,
  getState: Function,
) => {
  dispatch(app.addSubmitForm(REDUCER))

  let isLoggined = app.login(email, password, dispatch, getState)

  if (isLoggined) {
    dispatch(app.deleteSubmitForm(REDUCER))
  } else {
    dispatch(app.deleteSubmitForm(REDUCER))
  }
}

const initialState = {}
export default createReducer({}, initialState)
