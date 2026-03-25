import api from './api';

export default async function adminRejectReport(reportId) {
  try {
    const { data } = await api.post(`/admin/reports/${reportId}/reject`);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
