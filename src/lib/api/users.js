import axios from 'axios';

export const getUserList = () => {
  return axios.get('/api/v1.0/users');
} 