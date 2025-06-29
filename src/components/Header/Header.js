import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiUser, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.css';

const Header = ({ cartItemCount, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <motion.div
            className="logo-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🧸 Pichicato
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">
            {t('navigation.home')}
          </Link>
          <Link to="/catalog" className="nav-link">
            {t('navigation.catalog')}
          </Link>
          <Link to="/about" className="nav-link">
            {t('navigation.about')}
          </Link>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={t('common.theme')}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </motion.button>

          {/* Account */}
          <Link to="/account" className="header-action">
            <FiUser />
            <span className="action-text">{t('navigation.account')}</span>
          </Link>

          {/* Cart */}
          <motion.button
            className="header-action cart-button"
            onClick={onCartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShoppingBag />
            <span className="action-text">{t('navigation.cart')}</span>
            {cartItemCount > 0 && (
              <motion.span
                className="cart-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {cartItemCount}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            {t('navigation.home')}
          </Link>
          <Link to="/catalog" className="mobile-nav-link" onClick={closeMobileMenu}>
            {t('navigation.catalog')}
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
            {t('navigation.about')}
          </Link>
          <Link to="/account" className="mobile-nav-link" onClick={closeMobileMenu}>
            {t('navigation.account')}
          </Link>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header; 