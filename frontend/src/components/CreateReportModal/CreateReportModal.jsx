import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import styles from './CreateReportModal.module.scss';
import createReportProcess from '../../redux/thunks/createReportProcess';

const CreateReportModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    dispatch(createReportProcess({ title, description }));
    onClose();
  };

  return (
    <div className={cn(styles.overlay)} onClick={onClose}>
      <div className={cn(styles.modal)} onClick={(e) => e.stopPropagation()}>
        <div className={cn(styles.modalHeader)}>
          <h2 className={cn(styles.modalTitle)}>New Expense Report</h2>
          <button className={cn(styles.closeBtn)} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={cn(styles.field)}>
          <label className={cn(styles.label)}>Title</label>
          <input
            className={cn(styles.input)}
            placeholder='e.g. Q1 Travel'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={cn(styles.field)}>
          <label className={cn(styles.label)}>Description</label>
          <textarea
            className={cn(styles.textarea)}
            placeholder='Brief description of expenses...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className={cn(styles.footer)}>
          <button className={cn(styles.cancelBtn)} onClick={onClose}>
            Cancel
          </button>
          <button className={cn(styles.createBtn)} onClick={handleCreate}>
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReportModal;
