import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './MainContainer.module.scss';
import getAllReportsProcess from '../redux/thunks/getAllReportsProcess';
import deleteReportProcess from '../redux/thunks/deleteReportProcess';
import updateReportProcess from '../redux/thunks/updateReportProcess';

import ReportDetailModal from '../components/ReportDetailModal/ReportDetailModal';
import CreateReportModal from '../components/CreateReportModal/CreateReportModal';

const Main = () => {
  const dispatch = useDispatch();
  const { allReports } = useSelector((state) => state);

  const [selectedReport, setSelectedReport] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [editFields, setEditFields] = useState({ title: '', description: '' });

  useEffect(() => {
    dispatch(getAllReportsProcess());
  }, []);

  const handleEditSave = (reportId) => {
    dispatch(updateReportProcess(reportId, editFields));
    setEditingReport(null);
  };

  return (
    <div className={cn(styles.mainRoot)}>
      <div className={cn(styles.header)}>
        <span className={cn(styles.title)}>Reports</span>
        <button
          className={cn(styles.generateBtn)}
          onClick={() => setShowCreateModal(true)}
        >
          + Generate Report
        </button>
      </div>

      <div className={cn(styles.tableWrapper)}>
        <table className={cn(styles.tableContainer)}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allReports.map((report) => (
              <tr key={report.id}>
                {editingReport === report.id ? (
                  <>
                    <td>
                      <input
                        className={cn(styles.inlineInput)}
                        value={editFields.title}
                        onChange={(e) =>
                          setEditFields({
                            ...editFields,
                            title: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={cn(styles.inlineInput)}
                        value={editFields.description}
                        onChange={(e) =>
                          setEditFields({
                            ...editFields,
                            description: e.target.value,
                          })
                        }
                      />
                    </td>
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
                    <td className={cn(styles.actionCell)}>
                      <button
                        className={cn(styles.saveBtn)}
                        onClick={() => handleEditSave(report.id)}
                      >
                        Save
                      </button>
                      <button
                        className={cn(styles.cancelBtn)}
                        onClick={() => setEditingReport(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
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
                    <td className={cn(styles.actionCell)}>
                      <button
                        className={cn(styles.viewBtn)}
                        onClick={() => setSelectedReport(report)}
                      >
                        View
                      </button>
                      {(report.status === 'DRAFT' ||
                        report.status === 'REJECTED') && (
                        <>
                          <button
                            className={cn(styles.editBtn)}
                            onClick={() => {
                              setEditingReport(report.id);
                              setEditFields({
                                title: report.title,
                                description: report.description,
                              });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className={cn(styles.deleteBtn)}
                            onClick={() =>
                              dispatch(deleteReportProcess(report.id))
                            }
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {showCreateModal && (
        <CreateReportModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default Main;
