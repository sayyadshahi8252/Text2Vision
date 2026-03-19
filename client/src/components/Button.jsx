import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;