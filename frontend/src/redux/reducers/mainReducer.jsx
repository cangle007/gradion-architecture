export default function mainReducer(
  currentState = {
    allReports: [],
  },
  action,
) {
  switch (action.type) {
    case 'GET_ALL_REPORTS':
      return { ...currentState, allReports: action.allReports };

    case 'ADMIN_APPROVE_REPORT':
      return { ...currentState, report: action.report };

    case 'ADMIN_GET_ALL_REPORTS':
      return { ...currentState, allReports: action.reports };

    case 'ADMIN_REJECT_REPORT':
      return { ...currentState, report: action.report };

    case 'CREATE_REPORT_ITEM':
      return {
        ...currentState,
        reportId: [...currentState.allReports, action.report],
      };

    default:
      return currentState;
  }
}
