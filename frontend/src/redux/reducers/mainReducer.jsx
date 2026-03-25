export default function mainReducer(
  currentState = {
    allReports: [],
    adminReports: [],
    reportItems: {},
    adminToken: null,
  },
  action,
) {
  switch (action.type) {
    case 'GET_ALL_REPORTS':
      return { ...currentState, allReports: action.allReports };

    case 'CREATE_REPORT':
      return {
        ...currentState,
        allReports: [...currentState.allReports, action.report],
      };

    case 'UPDATE_REPORT':
      return {
        ...currentState,
        allReports: currentState.allReports.map((r) =>
          r.id === action.report.id ? action.report : r,
        ),
      };

    case 'DELETE_REPORT':
      return {
        ...currentState,
        allReports: currentState.allReports.filter(
          (r) => r.id !== action.reportId,
        ),
      };

    case 'SUBMIT_REPORT':
      return {
        ...currentState,
        allReports: currentState.allReports.map((r) =>
          r.id === action.report.id ? action.report : r,
        ),
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

    case 'ADMIN_LOGIN':
      return { ...currentState, adminToken: action.adminToken };

    case 'ADMIN_GET_ALL_REPORTS':
      return { ...currentState, adminReports: action.adminReports };

    case 'ADMIN_APPROVE_REPORT':
      return {
        ...currentState,
        adminReports: currentState.adminReports.map((r) =>
          r.id === action.report.id ? action.report : r,
        ),
      };

    case 'ADMIN_REJECT_REPORT':
      return {
        ...currentState,
        adminReports: currentState.adminReports.map((r) =>
          r.id === action.report.id ? action.report : r,
        ),
      };

    default:
      return currentState;
  }
}
