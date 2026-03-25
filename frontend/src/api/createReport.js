import api from './api';

export default async function createReport({ title, description }) {
  try {
    const { data } = await api.post('/reports', { title, description });
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
