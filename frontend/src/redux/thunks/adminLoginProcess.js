import login from '../../api/login';

export default function adminLoginProcess(email, password) {
  return async (dispatch) => {
    try {
      const { token } = await login(email, password);

      // Save to localStorage so the interceptor in api.js picks it up
      localStorage.setItem('token', token);

      dispatch({
        type: 'ADMIN_LOGIN',
        adminToken: token,
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };
}
