import axios from 'axios';

export const getCrowdsaleList = () => {
  return axios.get('/api/v1.0/contract/crowdsale')
} 