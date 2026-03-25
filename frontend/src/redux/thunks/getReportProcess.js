import getReport from '../../api/getReport';

export default function getReportProcess(reportId) {
  return async (dispatch) => {
    try {
      const report = await getReport(reportId);

      dispatch({
        type: 'GET_REPORT',
        report,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
