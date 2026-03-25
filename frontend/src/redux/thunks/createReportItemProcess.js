import createReportItem from '../../api/createReportItem';

export default function createReportItemProcess(reportId, itemData) {
  return async (dispatch) => {
    try {
      const item = await createReportItem(reportId, itemData);

      dispatch({
        type: 'CREATE_REPORT_ITEM',
        reportId,
        item,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
