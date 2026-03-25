import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from './redux/setupStore';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import MainContainer from './containers/MainContainer';

const store = setupStore(); // Initialize the store

import Loader from '../src/components/Loader/Loader';

const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Router>
            <Routes>
              <Route path='/' element={<MainContainer />} />
              {/* <Route exact path='/login' element={<LoginContainer />} /> */}
            </Routes>
          </Router>
        </Suspense>
      </Provider>
    </div>
  );
};

export default App;
