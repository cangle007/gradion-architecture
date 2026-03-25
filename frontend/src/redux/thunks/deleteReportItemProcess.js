import deleteReportItem from '../../api/deleteReportItem';

export default function deleteReportItemProcess(reportId, itemId) {
  return async (dispatch) => {
    try {
      await deleteReportItem(reportId, itemId);

      dispatch({
        type: 'DELETE_REPORT_ITEM',
        reportId,
        itemId,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
