import api from './api';

export default async function getReport(reportId) {
  try {
    const { data } = await api.get(`/reports/${reportId}`);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
