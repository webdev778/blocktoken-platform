import { createAction, handleActions } from 'redux-actions'

import { Map } from 'immutable';
import { pender } from 'redux-pender';

// api 
import * as OTPAPI from 'lib/api/otp'

import { message } from 'antd'

const REDUCER = 'otp'
const NS = `@@${REDUCER}/`

// action types
const GET_SECRET = `${NS}GET_SECRET`
const VERIFY_OTP = `${NS}VERIFY_OTP`

// action creator
export const getSecret = createAction(GET_SECRET, OTPAPI.getSecret)
export const verifyOTP = createAction(VERIFY_OTP, OTPAPI.verifyOTP)

// initial state
const initialState = Map({
  secretURI: '',
  secret: '',
  verified: false
})

//reducer
export default handleActions({
  ...pender({
    type: GET_SECRET,
    onSuccess: (state, action) => {
      const {
        uri,
        secret
      } = action.payload.data
      console.log(uri);
      console.log(action.payload)
      return state.set('secretURI', uri).set('secret', secret);
    }
  }),

  ...pender({
    type: VERIFY_OTP,
    onSuccess: (state, action) => {
      const {
        verified
      } = action.payload

      message.success('2FA Verified', 5);
      return state.set('verified', verified);
    },
    onFailure: (state, action) => {
      message.error('Failed 2FA', 5);
      return state.set('verified', false);
    }
  })
}, initialState)