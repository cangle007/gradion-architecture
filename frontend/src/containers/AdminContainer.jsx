import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './AdminContainer.module.scss';
import adminLoginProcess from '../redux/thunks/adminLoginProcess';
import adminGetAllReportsProcess from '../redux/thunks/adminGetAllReportsProcess';
import adminApproveReportProcess from '../redux/thunks/adminApproveReportProcess';
import adminRejectReportProcess from '../redux/thunks/adminRejectReportProcess';

const STATUS_FILTERS = ['ALL', 'DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'];

const AdminContainer = () => {
  const dispatch = useDispatch();
  const { adminReports, adminToken } = useSelector((state) => state);

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleLogin = () => {
    dispatch(adminLoginProcess(email, password));
  };

  useEffect(() => {
    if (adminToken) {
      dispatch(adminGetAllReportsProcess());
    }
  }, [adminToken]);

  const handleFilterChange = (status) => {
    setActiveFilter(status);
    dispatch(adminGetAllReportsProcess(status === 'ALL' ? null : status));
  };

  const handleApprove = (reportId) => {
    dispatch(adminApproveReportProcess(reportId));
  };

  const handleReject = (reportId) => {
    dispatch(adminRejectReportProcess(reportId));
  };

  if (!adminToken) {
    return (
      <div className={cn(styles.loginRoot)}>
        <div className={cn(styles.loginCard)}>
          <h2 className={cn(styles.loginTitle)}>Admin Login</h2>
          <p className={cn(styles.loginSubtitle)}>
            Sign in to manage expense reports
          </p>

          <div className={cn(styles.field)}>
            <label className={cn(styles.label)}>Email</label>
            <input
              className={cn(styles.input)}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={cn(styles.field)}>
            <label className={cn(styles.label)}>Password</label>
            <input
              className={cn(styles.input)}
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={cn(styles.loginBtn)} onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.adminRoot)}>
      <div className={cn(styles.header)}>
        <div>
          <h1 className={cn(styles.title)}>Admin Dashboard</h1>
          <p className={cn(styles.subtitle)}>
            Manage and review all expense reports
          </p>
        </div>
      </div>

      <div className={cn(styles.filterRow)}>
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            className={cn(styles.filterBtn, {
              [styles.filterActive]: activeFilter === status,
            })}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </button>
        ))}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminReports?.map((report) => (
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
                <td className={cn(styles.actionCell)}>
                  {report.status === 'SUBMITTED' && (
                    <>
                      <button
                        className={cn(styles.approveBtn)}
                        onClick={() => handleApprove(report.id)}
                      >
                        Approve
                      </button>
                      <button
                        className={cn(styles.rejectBtn)}
                        onClick={() => handleReject(report.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {report.status !== 'SUBMITTED' && (
                    <span className={cn(styles.noAction)}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContainer;
