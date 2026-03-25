import api from './api';

export default async function adminApproveReport(reportId) {
  try {
    const { data } = await api.post(`/admin/reports/${reportId}/approve`);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
