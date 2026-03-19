import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Signup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/dataSlice/dataSlice';

const Signup = ({ isModal }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {success,error,errormessage,successmessage}=useSelector((state)=>state.data)
  const dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up...", formData);
    dispatch(registerUser(formData))
  };

  return (

    <div className={isModal ? styles.modalWrapper : styles.pageWrapper}>
      <div className={styles.signupCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Join <span>Text2Vision</span></h1>
          <p className={styles.subtitle}>Start visualizing your imagination today.</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
           {success && (
            <p className={styles.successMsg}>
              {successmessage || "Registered successfully!"}
            </p>
          )}

          {/* 🔥 Error Message */}
          {errormessage && (
            <p className={styles.errorMsg}>
              {errormessage}
            </p>
          )}

          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Sayyad Shahi" 
              onChange={handleChange}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="name@example.com" 
              onChange={handleChange}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              onChange={handleChange}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="••••••••" 
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create Account
          </button>
        </form>

        {/* Only show the footer link if it's a standalone page. 
            If it's a modal, the AuthModal.jsx handles the switching logic.
        */}
        {!isModal && (
          <footer className={styles.footer}>
            <p>
              Already have an account?{' '}
              <NavLink to="/login" className={styles.link}>Sign in</NavLink>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Signup;