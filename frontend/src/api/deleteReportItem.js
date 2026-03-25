import api from './api';

export default async function deleteReportItem(reportId, itemId) {
  try {
    const { data } = await api.delete(`/reports/${reportId}/items/${itemId}`);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
