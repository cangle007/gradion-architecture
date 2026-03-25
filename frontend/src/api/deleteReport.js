import api from './api';

export default async function deleteReport(reportId) {
  try {
    const { data } = await api.delete(`/reports/${reportId}`);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
