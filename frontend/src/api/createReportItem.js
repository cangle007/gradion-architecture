import api from './api';

export default async function createReportItem(
  reportId,
  { amount, currency, category, merchant_name, transaction_date },
) {
  try {
    const { data } = await api.post(`/reports/${reportId}/items`, {
      amount,
      currency,
      category,
      merchant_name,
      transaction_date,
    });
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}
