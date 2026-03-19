import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import Signup from '../pages/Signup'; 
import Signin from '../pages/Signin'; 

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('signin');

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <div className={styles.content}>
          {view === 'signin' ? (
            <div className={styles.fadeAnim}>
             <Signin isModal={true} closeModal={onClose} />
              <p className={styles.toggleText}>
                Don't have an account? <span onClick={() => setView('signup')}>Create one</span>
              </p>
            </div>
          ) : (
            <div className={styles.fadeAnim}>
             <Signup isModal={true} closeModal={onClose} />
              <p className={styles.toggleText}>
                Already have an account? <span onClick={() => setView('signin')}>Sign in</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;