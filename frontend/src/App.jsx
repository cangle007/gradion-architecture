import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from './redux/setupStore';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';

import MainContainer from './containers/MainContainer';
import AdminContainer from './containers/AdminContainer';
import Loader from '../src/components/Loader/Loader';

const store = setupStore();

const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Router>
            <nav style={navStyle}>
              <NavLink to='/' style={({ isActive }) => linkStyle(isActive)}>
                User View
              </NavLink>
              <NavLink
                to='/admin'
                style={({ isActive }) => linkStyle(isActive)}
              >
                Admin View
              </NavLink>
            </nav>

            <Routes>
              <Route path='/' element={<MainContainer />} />
              <Route path='/admin' element={<AdminContainer />} />
            </Routes>
          </Router>
        </Suspense>
      </Provider>
    </div>
  );
};

const navStyle = {
  display: 'flex',
  gap: '8px',
  padding: '14px 3rem',
  background: '#fff',
  borderBottom: '1px solid #e2e8f0',
  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
};

const linkStyle = (isActive) => ({
  padding: '7px 18px',
  borderRadius: '99px',
  fontSize: '13px',
  fontWeight: 500,
  textDecoration: 'none',
  background: isActive ? '#2563eb' : 'transparent',
  color: isActive ? '#fff' : '#64748b',
  border: isActive ? '1px solid #2563eb' : '1px solid #e2e8f0',
  transition: 'all 0.15s ease',
});

export default App;
