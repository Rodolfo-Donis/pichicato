import React from 'react';
import { motion } from 'framer-motion';
import './Account.css';

const Account = () => (
  <div className="account section">
    <div className="container">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="account-title"
      >
        My Account
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="account-description"
      >
        Welcome to your account. Here you will be able to view your orders, manage your information, and more features coming soon!
      </motion.p>
    </div>
  </div>
);

export default Account; 