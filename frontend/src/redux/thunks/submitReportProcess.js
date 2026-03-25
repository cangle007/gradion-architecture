import submitReport from '../../api/submitReport';

export default function submitReportProcess(reportId) {
  return async (dispatch) => {
    try {
      const report = await submitReport(reportId);

      dispatch({
        type: 'SUBMIT_REPORT',
        report,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
