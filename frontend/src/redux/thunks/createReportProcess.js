import createReport from '../../api/createReport';

export default function createReportProcess({ title, description }) {
  return async (dispatch) => {
    try {
      const report = await createReport({ title, description });

      dispatch({
        type: 'CREATE_REPORT',
        report,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
