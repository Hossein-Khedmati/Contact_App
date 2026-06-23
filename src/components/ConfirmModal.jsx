import React from 'react';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <p style={{ marginBottom: '1rem' }}>{message || 'آیا مطمئنی؟'}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={btnCancel} onClick={onCancel} style={btnCancel}>لغو</button>
          <button style={btnDelete} onClick={onConfirm} style={btnDelete}>تایید</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;


const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  width: '300px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
};

const btnCancel = {
  width:'60px',
  backgroundColor: '#eee',
  padding: '0.5rem 1rem',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '0 10px 10px 0'
};

const btnDelete = {
  width:'60px',

  backgroundColor: 'red',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '10px 0 0 10px'
};
