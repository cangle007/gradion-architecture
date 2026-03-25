import { useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './MainContainer.module.scss';
import loginProcess from '../redux/thunks/loginProcess';

const Main = () => {
  useEffect(() => {
    const email = 'test@example.com'.trim();
    const pw = 'password123'.trim();
    loginProcess(email, pw);
  }, []);

  return (
    <div className={cn(styles.mainRoot)}>
      hello
      <div>
        <button>Generate Report</button>
      </div>
    </div>
  );
};

export default Main;
