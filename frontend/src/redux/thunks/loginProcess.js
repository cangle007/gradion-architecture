import api from '../../api/api';

export default async function signInProcess(email, password) {
  try {
    const { data } = await api.post('/auth/login', { email, password });

    localStorage.setItem('token', data.token);

    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
