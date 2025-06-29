import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiLock, FiShield, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './SpreedlyPayment.css';

const SpreedlyPayment = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Card number validation (basic)
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry date validation
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    // CVV validation
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    // Cardholder name validation
    if (formData.cardholderName.trim().length < 2) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    // Email validation
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // Simulate API call to Spreedly
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setPaymentStatus('success');
        onPaymentSuccess && onPaymentSuccess({
          transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
          amount: amount,
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setPaymentStatus('error');
      onPaymentError && onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'generic';
  };

  return (
    <div className="payment-container">
      <motion.div
        className="payment-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="payment-header">
          <div className="payment-title">
            <FiCreditCard className="payment-icon" />
            <h2>Secure Payment</h2>
          </div>
          <div className="payment-amount">
            <span className="amount-label">Total Amount</span>
            <span className="amount-value">${amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="security-badges">
          <div className="security-badge">
            <FiLock />
            <span>SSL Encrypted</span>
          </div>
          <div className="security-badge">
            <FiShield />
            <span>PCI Compliant</span>
          </div>
        </div>

        {paymentStatus === 'success' ? (
          <motion.div
            className="payment-success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiCheckCircle className="success-icon" />
            <h3>Payment Successful!</h3>
            <p>Your order has been processed successfully.</p>
            <div className="transaction-details">
              <span>Transaction ID: txn_123456789</span>
              <span>Amount: ${amount.toFixed(2)}</span>
            </div>
          </motion.div>
        ) : paymentStatus === 'error' ? (
          <motion.div
            className="payment-error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiAlertCircle className="error-icon" />
            <h3>Payment Failed</h3>
            <p>Please check your card details and try again.</p>
            <button 
              className="btn btn-primary retry-btn"
              onClick={() => setPaymentStatus(null)}
            >
              Try Again
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={errors.cardNumber ? 'error' : ''}
                />
                <div className={`card-type ${getCardType(formData.cardNumber)}`}></div>
              </div>
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={errors.expiryDate ? 'error' : ''}
                />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  className={errors.cvv ? 'error' : ''}
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={errors.cardholderName ? 'error' : ''}
              />
              {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <button
              type="submit"
              className={`btn btn-primary payment-btn ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="spinner"></div>
                  Processing Payment...
                </>
              ) : (
                `Pay $${amount.toFixed(2)}`
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default SpreedlyPayment; 