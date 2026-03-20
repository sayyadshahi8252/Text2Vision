import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "./Button";
import AuthModal from "../components/AuthModal";

import creditIcon from "../assets/lighting.png";
import profileIcon from "../assets/user.png";
import logoutIcon from "../assets/logout.png";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/dataSlice/dataSlice";

const Header = () => {
  const [ isScrolled, setIsScrolled ] = useState(false);
  const [ isAuthOpen, setIsAuthOpen ] = useState(false);

  const dispatch = useDispatch();

  // ✅ include loading
  const { user, credits, loading } = useSelector((state) => state.data);

  const isLoggedIn = !!user;

  // 🔥 scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 prevent flicker (IMPORTANT)
  if (loading) {
    return null; // or loader if you want
  }

  // 🔥 logout handler (clean)
  const handleLogout = async () => {
    await dispatch(logoutUser());
    // optional: you can redirect if needed
    // navigate("/")
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""
          }`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <NavLink to="/" className={styles.logoLink}>
            <span className={styles.brandText}>Text2Vision</span>
          </NavLink>

          {/* Navigation */}
          <nav className={styles.nav}>
            {isLoggedIn ? (
              <div className={styles.userSection}>
                {/* Links */}
                <NavLink
                  to="/plans"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Plans
                </NavLink>

                <NavLink
                  to="/generate"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Generate
                </NavLink>

                {/* Credits */}
                <div className={styles.creditPill}>
                  <img src={creditIcon} alt="credits" className={styles.iconSmall} />

                  <span className={styles.creditNumber}>
                    {credits || 0}
                  </span>

                  <span className={styles.creditLabel}>
                    Credits
                  </span>
                </div>

                {/* User Section */}
                <div className={styles.userActions}>
                  <span className={styles.userName}>
                    {user?.username || "User"}
                  </span>

                  <img
                    src={profileIcon}
                    alt="profile"
                    className={styles.profileIcon}
                  />

                  {/* Logout */}
                  <div
                    className={styles.logoutWrapper}
                    onClick={handleLogout}
                  >
                    <img
                      src={logoutIcon}
                      alt="logout"
                      className={styles.logoutIcon}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.authGroup}>
                <NavLink
                  to="/plans"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Plans
                </NavLink>

                {/* Open Auth Modal */}
                <Button
                  text="Sign up"
                  variant="primary"
                  onClick={() => setIsAuthOpen(true)}
                />
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
};

export default Header;