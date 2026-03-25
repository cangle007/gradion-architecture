import api from './api';

export default async function updateReportItem(reportId, itemId, fields) {
  try {
    const { data } = await api.patch(
      `/reports/${reportId}/items/${itemId}`,
      fields,
    );
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
