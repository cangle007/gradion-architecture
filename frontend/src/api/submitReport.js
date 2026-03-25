import api from './api';

export default async function submitReport(reportId) {
  try {
    const { data } = await api.post(`/reports/${reportId}/submit`);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
