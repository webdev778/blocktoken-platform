import axios from 'axios';

export const checkEmail = (email) => axios.get('/api/v1.0/auth/exists/email/' + email);
export const checkDisplayName = (displayName) => axios.get('/api/v1.0/auth/exists/display-name/' + displayName);
export const localRegister = ({
  email,
  password,
  fullname,
  address,
  company,
  website
  //initialMoney: { currency, index }
}) => axios.post('/api/v1.0/auth/register/local', {
  email,
  password,
  fullname,
  address,
  company,
  website
  //initialMoney: { currency, index }
})
export const localLogin = ({email, password}) => axios.post('/api/v1.0/auth/login/local', {
  email, password
});
export const socialLogin = ({provider, accessToken}) => axios.post('/api/v1.0/auth/login/' + provider, {
  accessToken
});
export const socialRegister = ({
  fullname,
  address,
  company,
  website,
  provider,
  accessToken
  //initialMoney: { currency, index } 
}) => axios.post('/api/v1.0/auth/register/' + provider, {
  fullname,
  address,
  company,
  website,
  accessToken
  //initialMoney: { currency, index }
});
export const checkLoginStatus = () => axios.get('/api/v1.0/auth/check');
export const logout = () => axios.post('/api/v1.0/auth/logout');

export const resendEmail = ({email}) => axios.post('/api/v1.0/auth/resend', {email});