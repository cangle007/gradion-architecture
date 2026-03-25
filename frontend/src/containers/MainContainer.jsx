import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './MainContainer.module.scss';
import loginProcess from '../redux/thunks/loginProcess';
import getAllReportsProcess from '../redux/thunks/getAllReportsProcess';

const Main = () => {
  const dispatch = useDispatch();
  const { allReports } = useSelector((state) => state);

  useEffect(() => {
    const email = 'test@example.com'.trim();
    const pw = 'password123'.trim();
    loginProcess(email, pw);
    dispatch(getAllReportsProcess());
  }, []);

  console.log('allreport here~~', allReports);

  return (
    <div className={cn(styles.mainRoot)}>
      hello
      <div>
        <button>Generate Report</button>
      </div>
      <div className={cn(styles.mainRoot)}>
        <div className={cn(styles.header)}>
          <span className={cn(styles.title)}>Reports</span>
          <button className={cn(styles.generateBtn)}>Generate Report</button>
        </div>

        <div className={cn(styles.tableWrapper)}>
          <table className={cn(styles.tableContainer)}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {allReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.description}</td>
                  <td>
                    <span
                      className={cn(
                        styles.badge,
                        styles[report.status.toLowerCase()],
                      )}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>${parseFloat(report.total_amount).toFixed(2)}</td>
                  <td>{report.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Main;
