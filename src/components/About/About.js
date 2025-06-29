import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => (
  <div className="about section">
    <div className="container">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-title"
      >
        About Pichicato
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="about-description"
      >
        Pichicato is a modern toy store dedicated to inspiring creativity, learning, and joy in children of all ages. Our curated selection of toys is designed to foster development, spark imagination, and create lasting memories. We believe in the power of play and strive to provide the best products and experiences for families everywhere.
      </motion.p>
      <div className="about-features">
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3>Curated Selection</h3>
          <p>Handpicked toys for every age and interest, focusing on quality and safety.</p>
        </motion.div>
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3>Modern Shopping</h3>
          <p>Enjoy a seamless, secure, and fun shopping experience with modern payment options.</p>
        </motion.div>
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h3>Community & Support</h3>
          <p>We support parents and educators with resources, news, and a caring community.</p>
        </motion.div>
      </div>
    </div>
  </div>
);

export default About; 