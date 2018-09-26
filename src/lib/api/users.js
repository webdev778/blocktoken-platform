import axios from 'axios';

export const getUserList = () => {
  return axios.get('/api/v1.0/users');
}

export const getUser = () => {
  return axios.get('/api/v1.0/users/info/');
}

export const setUser = ({ fullname, address, company, website }) => {
  return axios.put('/api/v1.0/users/save/', { fullname, address, company, website });
}

export const setPassword = ({ curpassword, newpassword }) => {
  return axios.put('/api/v1.0/users/cert/', { curpassword, newpassword });
}

export const setReview = () => {
  return axios.put('/api/v1.0/users/review/');
}

export const savePoI = (formData) => {
  return axios.post('/api/v1.0/identity/idreg', formData);
}
export const savePoA = (formData) => {
  return axios.post('/api/v1.0/identity/bankreg', formData);
}