import api from './api';

export default async function adminGetAllReports(status) {
  try {
    const params = status ? { status } : {};
    const { data } = await api.get('/admin/reports', { params });
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
