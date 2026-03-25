import adminGetAllReports from '../../api/adminGetAllReports';

export default function adminGetAllReportsProcess(status) {
  return async (dispatch) => {
    try {
      const { reports } = await adminGetAllReports(status);

      dispatch({
        type: 'ADMIN_GET_ALL_REPORTS',
        allReports: reports,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
