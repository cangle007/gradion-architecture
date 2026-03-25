import api from './api';

export default async function getReportItems(reportId) {
  try {
    const { data } = await api.get(`/reports/${reportId}/items`);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
