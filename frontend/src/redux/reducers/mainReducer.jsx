export default function mainReducer(
  currentState = {
    allReports: [],
    deploymentDetails: [],
  },
  action,
) {
  switch (action.type) {
    case 'GET_ALL_REPORTS':
      return { ...currentState, allReports: action.allReports };

    default:
      return currentState;
  }
}
