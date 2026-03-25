export default function mainReducer(
  currentState = {
    dashboardServices: [],
    deploymentStatus: [],
    deploymentDetails: [],
  },
  action,
) {
  switch (action.type) {
    case 'UPDATE_DASHBOARD_SERVICE':
      return { ...currentState, dashboardServices: action.dashboardServices };

    case 'GET_DASHBOARD_SERVICE':
      return { ...currentState, dashboardServices: action.dashboardServices };

    case 'GET_DEPLOYMENT_STATUS':
      return { ...currentState, deploymentStatus: action.deploymentStatus };

    case 'GET_DEPLOYMENT_DETAILS':
      return {
        ...currentState,
        deploymentDetails: action.deploymentDetails,
      };

    default:
      return currentState;
  }
}
