import updateReport from '../../api/updateReport';

export default function updateReportProcess(reportId, fields) {
  return async (dispatch) => {
    try {
      const report = await updateReport(reportId, fields);

      dispatch({
        type: 'UPDATE_REPORT',
        report,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
