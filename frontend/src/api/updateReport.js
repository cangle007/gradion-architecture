import api from './api';

export default async function updateReport(reportId, { title, description }) {
  try {
    const { data } = await api.patch(`/reports/${reportId}`, {
      title,
      description,
    });
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
