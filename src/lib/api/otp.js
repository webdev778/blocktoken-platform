import axios from 'axios';

export const getSecret = () => axios.get('/api/v1.0/mfa');
export const verifyOTP = ({otp, secret}) => axios.post('/api/v1.0/mfa', {otp, secret});