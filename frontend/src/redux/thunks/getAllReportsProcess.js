import getAllReports from '../../api/getAllReports';

export default function getReportsProcess() {
  return async (dispatch, getState) => {
    try {
      const { reports } = await getAllReports();

      dispatch({
        type: 'GET_ALL_REPORTS',
        allReports: reports,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
