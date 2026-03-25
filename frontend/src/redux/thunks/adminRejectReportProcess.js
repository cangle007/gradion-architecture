import adminRejectReport from '../../api/adminRejectReport';

export default function adminRejectReportProcess(reportId) {
  return async (dispatch) => {
    try {
      const report = await adminRejectReport(reportId);

      dispatch({
        type: 'ADMIN_REJECT_REPORT',
        report,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
