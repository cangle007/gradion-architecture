import updateReportItem from '../../api/updateReportItem';

export default function updateReportItemProcess(reportId, itemId, fields) {
  return async (dispatch) => {
    try {
      const item = await updateReportItem(reportId, itemId, fields);

      dispatch({
        type: 'UPDATE_REPORT_ITEM',
        reportId,
        item,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
