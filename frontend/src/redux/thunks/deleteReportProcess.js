import deleteReport from '../../api/deleteReport';

export default function deleteReportProcess(reportId) {
  return async (dispatch) => {
    try {
      await deleteReport(reportId);

      dispatch({
        type: 'DELETE_REPORT',
        reportId,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
