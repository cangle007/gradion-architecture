export default function mainReducer(
  currentState = {
    allReports: [],
    reportItems: {},
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

    case 'CREATE_REPORT':
      return {
        ...currentState,
        allReports: [...currentState.allReports, action.report],
      };

    case 'DELETE_REPORT':
      return {
        ...currentState,
        allReports: currentState.allReports.filter((item) => {
          return item.id !== action.reportId;
        }),
      };

    case 'GET_REPORT_ITEMS':
      return {
        ...currentState,
        reportItems: {
          ...currentState.reportItems,
          [action.reportId]: action.items,
        },
      };

    case 'CREATE_REPORT_ITEM':
      return {
        ...currentState,
        reportItems: {
          ...currentState.reportItems,
          [action.reportId]: [
            ...(currentState.reportItems[action.reportId] || []),
            action.item,
          ],
        },
      };

    case 'DELETE_REPORT_ITEM':
      return {
        ...currentState,
        reportItems: {
          ...currentState.reportItems,
          [action.reportId]: currentState.reportItems[action.reportId].filter(
            (item) => item.id !== action.itemId,
          ),
        },
      };

    case 'UPDATE_REPORT_ITEM':
      return {
        ...currentState,
        reportItems: {
          ...currentState.reportItems,
          [action.reportId]: currentState.reportItems[action.reportId].map(
            (item) => (item.id === action.item.id ? action.item : item),
          ),
        },
      };

    default:
      return currentState;
  }
}
