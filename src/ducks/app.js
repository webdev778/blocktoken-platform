import { createAction, createReducer } from 'redux-act'
import { push } from 'react-router-redux'
import { pendingTask, begin, end } from 'react-redux-spinner'
import { notification } from 'antd'
import * as AuthAPI from 'lib/api/auth'
import {fromJS, toJS} from 'immutable'
import * as authActions from './auth'
import {bindActionCreators} from 'redux'

const REDUCER = 'app'
const NS = `@@${REDUCER}/`

export const _setFrom = createAction(`${NS}SET_FROM`)
export const _setLoading = createAction(`${NS}SET_LOADING`)
export const _setHideLogin = createAction(`${NS}SET_HIDE_LOGIN`)

export const setUserState = createAction(`${NS}SET_USER_STATE`)
export const setUpdatingContent = createAction(`${NS}SET_UPDATING_CONTENT`)
export const setActiveDialog = createAction(`${NS}SET_ACTIVE_DIALOG`)
export const deleteDialogForm = createAction(`${NS}DELETE_DIALOG_FORM`)
export const addSubmitForm = createAction(`${NS}ADD_SUBMIT_FORM`)
export const deleteSubmitForm = createAction(`${NS}DELETE_SUBMIT_FORM`)
export const setLayoutState = createAction(`${NS}SET_LAYOUT_STATE`)

export const goToPage = (path) => (dispatch, getState) => {
  dispatch(push(path))
}

export const setLoading = isLoading => {
  const action = _setLoading(isLoading)
  action[pendingTask] = isLoading ? begin : end
  return action
}

export const resetHideLogin = () => (dispatch, getState) => {
  const state = getState()
  if (state.pendingTasks === 0 && state.app.isHideLogin) {
    dispatch(_setHideLogin(false))
  }
  return Promise.resolve()
}

export const initAuth = roles => (dispatch, getState) => {
  // Use Axios there to get User Data by Auth Token with Bearer Method Authentication

  const state = getState()

  if (state.app.userState.role !== '')
    return Promise.resolve(true);
  else
  {
    const location = state.routing.location
    const from = location.pathname + location.search
    dispatch(_setFrom(from))
    dispatch(push('/login'))
    return Promise.reject()
  }
}

export async function login(email, password, dispatch) {
  // Use Axios there to get User Auth Token with Basic Method Authentication
  try{
    const result = await AuthAPI.localLogin({email, password})
    dispatch(
      setUserState({
        userState: {
          email: email,
          fullname: result.data.fullname,
          auth_status: result.data.auth_status,
          kyc_status: result.data.kyc_status,
          role: 'user',
        },
      }),
    )
    if (email === 'admin@blocktoken.ai' && password === '123123')
    {
      dispatch(
        setUserState({
          userState: {
            email: email,
            fullname: result.data.fullname,
            auth_status: result.data.auth_status,
            kyc_status: result.data.kyc_status,
            role: 'admin',
          },
        }),
      )
      dispatch(_setHideLogin(true))
      dispatch(push('/admin/dashboard'))
      notification.open({
        type: 'success',
        message: 'You have successfully logged in!',
      })
  
      return true;
    }
    
    if (result.data.auth_status > 0)
    {
      dispatch(_setHideLogin(true))
      dispatch(push('/user/dashboard'))
      notification.open({
        type: 'success',
        message: 'Login success!',
      })  
    }
    else
    {
      dispatch(push('/confirm'))
    }
    return true;
    
  }catch(err){
    let message = '';
    if (err.message === 'Request failed with status code 402')
      message = 'Your password is wrong.';
    else if (err.message === 'Request failed with status code 403')
      message = 'Email is not registered.'
    notification.open({
      type: 'error',
      message: message,
    })

    dispatch(push('/login'))
    dispatch(_setFrom(''))
    return false;
  }
}

export async function signup(email, password, fullname, address, company, website, dispatch) {
  // Use Axios there to get User Auth Token with Basic Method Authentication
  try{
    const result = await AuthAPI.localRegister({email, password, fullname, address, company, website})
  
    //dispatch(_setHideLogin(true))
    if (email === 'admin@blocktoken.ai')
    {
      dispatch(
        setUserState({
          userState: {
            email: email,
            fullname: fullname,
            auth_status: 1,
            role: 'admin',
          },
        }),
      )
      dispatch(push('/admin/dashboard'))
    }
    else
    {
      dispatch(
        setUserState({
          userState: {
            email: email,
            fullname: fullname,
            auth_status: 0,
            role: 'user',
          },
        }),
      )
      dispatch(push('/confirm'))
    }
    
    notification.open({
      type: 'success',
      message: 'You have successfully signed up!',
    })

    return true;
    
  }catch(err){
    let message = '';
    if (err.message === 'Request failed with status code 409')
      message = 'Your information conflicted.';
    notification.open({
      type: 'error',
      message: message,
    })
    //dispatch(push('/login'))
    dispatch(_setFrom(''))
    return false;
  }
}

export async function socialSignup(fullname, address, company, website, dispatch, getState) {
  // Use Axios there to get User Auth Token with Basic Method Authentication
  try{
    const state = getState()
    const {provider, accessToken} = state.auth.get('socialInfo').toJS()

    const result = await AuthAPI.socialRegister({fullname, address, company, website, provider, accessToken})
    const socialProfile = state.auth.get('socialProfile');
    dispatch(
      setUserState({
        userState: {
          email: socialProfile.email,
          fullname: socialProfile.name,
          auth_status: 0,
          kyc_status: 0,
          role: 'user',
        },
      }),
    )
    dispatch(_setHideLogin(true))
    dispatch(push('/user/dashboard'))
    
    notification.open({
      type: 'success',
      message: 'You have successfully signed up!',
    })

    return true;
    
  }catch(err){
    notification.open({
      type: 'error',
      message: 'Sign up failed!',
    })
    //dispatch(push('/login'))
    dispatch(_setFrom(''))
    return false;
  }
}

export const logout = () => async (dispatch, getState) => {

  //console.log(authActions.logout)
  const AuthActions = bindActionCreators(authActions, dispatch)
  const result = await AuthActions.logout()
  // dispatch(AuthActions.logout);
  
  dispatch(
    setUserState({
      userState: {
        email: '',
        fullname: '',
        auth_status: 99,
        kyc_status: 99,
        role: '',
      },
    }),
  )

  dispatch(push('/login'))
   
}

const initialState = {
  // APP STATE
  from: '',
  isUpdatingContent: false,
  isLoading: false,
  activeDialog: '',
  dialogForms: {},
  submitForms: {},
  isHideLogin: false,

  // LAYOUT STATE
  layoutState: {
    isMenuTop: false,
    menuMobileOpened: false,
    menuCollapsed: false,
    menuShadow: true,
    themeLight: true,
    squaredBorders: false,
    borderLess: true,
    fixedWidth: false,
    settingsOpened: false,
  },

  // USER STATE
  userState: {
    email: '',
    fullname: '',
    auth_status: 99,
    kyc_status: 99,
    role: '',
  },
}

export default createReducer(
  {
    [_setFrom]: (state, from) => ({ ...state, from }),
    [_setLoading]: (state, isLoading) => ({ ...state, isLoading }),
    [_setHideLogin]: (state, isHideLogin) => ({ ...state, isHideLogin }),
    [setUpdatingContent]: (state, isUpdatingContent) => ({ ...state, isUpdatingContent }),
    [setUserState]: (state, { userState }) => ({ ...state, userState }),
    [setLayoutState]: (state, param) => {
      const layoutState = { ...state.layoutState, ...param }
      const newState = { ...state, layoutState }
      window.localStorage.setItem('app.layoutState', JSON.stringify(newState.layoutState))
      return newState
    },
    [setActiveDialog]: (state, activeDialog) => {
      const result = { ...state, activeDialog }
      if (activeDialog !== '') {
        const id = activeDialog
        result.dialogForms = { ...state.dialogForms, [id]: true }
      }
      return result
    },
    [deleteDialogForm]: (state, id) => {
      const dialogForms = { ...state.dialogForms }
      delete dialogForms[id]
      return { ...state, dialogForms }
    },
    [addSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms, [id]: true }
      return { ...state, submitForms }
    },
    [deleteSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms }
      delete submitForms[id]
      return { ...state, submitForms }
    },
  },
  initialState,
)
