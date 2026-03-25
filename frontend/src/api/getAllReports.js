import api from './api';

export default async function getAllReports() {
  try {
    const { data } = await api.get('/reports');

    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
