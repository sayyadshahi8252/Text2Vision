import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Signin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/dataSlice/dataSlice';
import { useEffect } from 'react';

const Signin = ({ isModal,closeModal }) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
    const {success,error,errormessage,successmessage}=useSelector((state)=>state.data)
    
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await dispatch(loginUser(formData));

  if (loginUser.fulfilled.match(res)) {
    if (isModal && closeModal) {
      closeModal(); // ✅ CLOSE POPUP
    }
    navigate("/", { replace: true }); // ✅ NAVIGATE
  }
};
  return (
    /* Adaptive container: uses modalWrapper if inside a popup */
    <div className={isModal ? styles.modalWrapper : styles.pageWrapper}>
      <div className={styles.signinCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome <span>Back</span></h1>
          <p className={styles.subtitle}>Enter your details to access your vision.</p>
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
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="sayyad@example.com" 
              onChange={handleChange}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label>Password</label>
              <NavLink to="/forgot-password" className={styles.forgotLink}>Forgot?</NavLink>
            </div>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <button className={styles.googleBtn}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="" />
          Google
        </button>

        {/* Footer hidden if in Modal to let AuthModal handle switching */}
        {!isModal && (
          <footer className={styles.footer}>
            <p>Don't have an account? <NavLink to="/signup" className={styles.link}>Create one</NavLink></p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Signin;