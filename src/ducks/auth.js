import { createAction, handleActions } from 'redux-actions'
// import * as app from './app'
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';
import social from 'lib/social';

export const REDUCER = 'auth'

// action types
const TOGGLE_LOGIN_MODAL = 'auth/TOGGLE_LOGIN_MODAL';
const SET_MODAL_MODE = 'auth/SET_MODAL_MODE';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';
const CHECK_EMAIL = 'auth/CHECK_EMAIL';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN';
const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';
const LOGOUT = 'auth/LOGOUT';

// action creator
export const providerLogin = createAction(PROVIDER_LOGIN, (provider) => social[provider](), provider => provider);
export const socialLogin = createAction(SOCIAL_LOGIN, AuthAPI.socialLogin);
export const logout = createAction(LOGOUT, AuthAPI.logout);


const initialState = Map({
  loginResult: null,
  socialInfo: null,
  socialProfile: null,
  redirectToRegister: false
})

//reducer
export default handleActions({
  ...pender({
    type: PROVIDER_LOGIN,
    onSuccess: (state, action) => {
      const {
        payload: accessToken,
        meta: provider
      } = action;

      return state.set('socialInfo', Map({
        accessToken,
        provider
      }));
    }
  }),
  ...pender({
    type: SOCIAL_LOGIN,
    onSuccess: (state, action) => {
      const { data: loginResult } = action.payload;
      const { data: { socialProfile } } = action.payload;
      if (socialProfile) {
        return state.set('socialProfile', socialProfile).set('redirectToRegister', true);
      }
      else {
        const { data: socialLoginProfile } = action.payload;
        return state.set('socialProfile', socialLoginProfile).set('redirectToRegister', false).set('loginResult', loginResult);
      }
    }
  }),
  ...pender({
    type: LOGOUT,
    onSuccess: (state, action) => {
      return initialState;
    }
  })

}, initialState)
