import adminApproveReport from '../../api/adminApproveReport';

export default function adminApproveReportProcess(reportId) {
  return async (dispatch) => {
    try {
      const report = await adminApproveReport(reportId);

      dispatch({
        type: 'ADMIN_APPROVE_REPORT',
        report,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
