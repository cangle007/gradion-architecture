import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './ReportDetailModal.module.scss';
import getReportItemsProcess from '../redux/thunks/getReportItemsProcess';
import createReportItemProcess from '../redux/thunks/createReportItemProcess';
import updateReportItemProcess from '../redux/thunks/updateReportItemProcess';
import deleteReportItemProcess from '../redux/thunks/deleteReportItemProcess';
import submitReportProcess from '../redux/thunks/submitReportProcess';

const EMPTY_ITEM = {
  amount: '',
  currency: 'USD',
  category: '',
  merchant_name: '',
  transaction_date: '',
};

const ReportDetailModal = ({ report, onClose }) => {
  const dispatch = useDispatch();
  const { reportItems } = useSelector((state) => state);
  const items = reportItems[report.id] || [];

  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState(EMPTY_ITEM);
  const [showAddForm, setShowAddForm] = useState(false);

  const isDraft = report.status === 'DRAFT' || report.status === 'REJECTED';

  useEffect(() => {
    dispatch(getReportItemsProcess(report.id));
  }, [report.id]);

  const handleAddItem = () => {
    dispatch(createReportItemProcess(report.id, newItem));
    setNewItem(EMPTY_ITEM);
    setShowAddForm(false);
  };

  const handleUpdateItem = () => {
    dispatch(updateReportItemProcess(report.id, editingItem.id, editingItem));
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteReportItemProcess(report.id, itemId));
  };

  const handleSubmit = () => {
    dispatch(submitReportProcess(report.id));
    onClose();
  };

  return (
    <div className={cn(styles.overlay)} onClick={onClose}>
      <div className={cn(styles.modal)} onClick={(e) => e.stopPropagation()}>
        <div className={cn(styles.modalHeader)}>
          <div>
            <h2 className={cn(styles.modalTitle)}>{report.title}</h2>
            <p className={cn(styles.modalDesc)}>{report.description}</p>
          </div>
          <button className={cn(styles.closeBtn)} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={cn(styles.metaRow)}>
          <span
            className={cn(styles.badge, styles[report.status.toLowerCase()])}
          >
            {report.status}
          </span>
          <span className={cn(styles.total)}>
            Total: ${parseFloat(report.total_amount).toFixed(2)}
          </span>
        </div>

        <div className={cn(styles.itemsSection)}>
          <div className={cn(styles.itemsHeader)}>
            <span className={cn(styles.sectionLabel)}>Expense Items</span>
            {isDraft && (
              <button
                className={cn(styles.addBtn)}
                onClick={() => setShowAddForm(true)}
              >
                + Add Item
              </button>
            )}
          </div>

          {showAddForm && (
            <div className={cn(styles.itemForm)}>
              <input
                placeholder='Merchant'
                value={newItem.merchant_name}
                onChange={(e) =>
                  setNewItem({ ...newItem, merchant_name: e.target.value })
                }
              />
              <input
                placeholder='Category'
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              />
              <input
                type='number'
                placeholder='Amount'
                value={newItem.amount}
                onChange={(e) =>
                  setNewItem({ ...newItem, amount: e.target.value })
                }
              />
              <input
                placeholder='Currency'
                value={newItem.currency}
                onChange={(e) =>
                  setNewItem({ ...newItem, currency: e.target.value })
                }
              />
              <input
                type='date'
                value={newItem.transaction_date}
                onChange={(e) =>
                  setNewItem({ ...newItem, transaction_date: e.target.value })
                }
              />
              <div className={cn(styles.formActions)}>
                <button className={cn(styles.saveBtn)} onClick={handleAddItem}>
                  Save
                </button>
                <button
                  className={cn(styles.cancelBtn)}
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <table className={cn(styles.itemsTable)}>
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                {isDraft && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {editingItem?.id === item.id ? (
                    <>
                      <td>
                        <input
                          value={editingItem.merchant_name}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              merchant_name: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={editingItem.category}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              category: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type='number'
                          value={editingItem.amount}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              amount: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type='date'
                          value={editingItem.transaction_date}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              transaction_date: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <button
                          className={cn(styles.saveBtn)}
                          onClick={handleUpdateItem}
                        >
                          Save
                        </button>
                        <button
                          className={cn(styles.cancelBtn)}
                          onClick={() => setEditingItem(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.merchant_name}</td>
                      <td>{item.category}</td>
                      <td>
                        ${parseFloat(item.amount).toFixed(2)} {item.currency}
                      </td>
                      <td>{item.transaction_date}</td>
                      {isDraft && (
                        <td className={cn(styles.actionCell)}>
                          <button
                            className={cn(styles.editBtn)}
                            onClick={() => setEditingItem({ ...item })}
                          >
                            Edit
                          </button>
                          <button
                            className={cn(styles.deleteBtn)}
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isDraft && (
          <div className={cn(styles.modalFooter)}>
            <button className={cn(styles.submitBtn)} onClick={handleSubmit}>
              Submit Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetailModal;
