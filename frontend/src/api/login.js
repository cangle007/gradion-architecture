import api from './api';

export default async function login(email, password) {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
