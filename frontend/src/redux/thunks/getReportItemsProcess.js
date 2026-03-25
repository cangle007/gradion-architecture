import getReportItems from '../../api/getReportItems';

export default function getReportItemsProcess(reportId) {
  return async (dispatch) => {
    try {
      const items = await getReportItems(reportId);

      dispatch({
        type: 'GET_REPORT_ITEMS',
        reportId,
        items,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
