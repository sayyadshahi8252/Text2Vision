import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Brand Identity */}
          <div className={styles.brandSide}>
            <h2 className={styles.logo}>Text2Vision</h2>
            <p className={styles.tagline}>
              Redefining the boundaries of human imagination <br /> 
              through generative intelligence.
            </p>
          </div>

          {/* Navigation Links */}
          <div className={styles.linkGrid}>
            <div className={styles.linkGroup}>
              <h4>Platform</h4>
              <NavLink to="/generate">Generator</NavLink>
              <NavLink to="/showcase">Showcase</NavLink>
              <NavLink to="/plans">Pricing</NavLink>
            </div>
            <div className={styles.linkGroup}>
              <h4>Company</h4>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/careers">Careers</NavLink>
            </div>
            <div className={styles.linkGroup}>
              <h4>Legal</h4>
              <NavLink to="/privacy">Privacy</NavLink>
              <NavLink to="/terms">Terms</NavLink>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} Text2Vision. Crafted by <span>Sayyad Shahi</span>.
          </p>
          <div className={styles.socials}>
            <a href="#twitter" aria-label="Twitter">Twitter</a>
            <a href="#github" aria-label="GitHub">GitHub</a>
            <a href="#discord" aria-label="Discord">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;