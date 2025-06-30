import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiMapPin, FiTruck, FiCreditCard, FiCheck, FiUser } from 'react-icons/fi';
import SpreedlyPayment from '../SpreedlyPayment/SpreedlyPayment';
import './Checkout.css';

const Checkout = ({ cartItems, onClose, onOrderComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Shipping Method
    shippingMethod: 'standard',
    
    // Payment
    paymentMethod: 'card'
  });
  
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Customer Info', icon: FiUser },
    { id: 2, title: 'Shipping', icon: FiMapPin },
    { id: 3, title: 'Payment', icon: FiCreditCard },
    { id: 4, title: 'Review', icon: FiCheck }
  ];

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 5.99,
      delivery: '3-5 business days',
      icon: FiTruck
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 12.99,
      delivery: '1-2 business days',
      icon: FiTruck
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 24.99,
      delivery: 'Next business day',
      icon: FiTruck
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingOptions.find(option => option.id === formData.shippingMethod)?.price || 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      
      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        break;
      
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePaymentSuccess = (paymentData) => {
    // Here you would typically send the order to your backend
    const order = {
      id: `ORD-${Date.now()}`,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      },
      shipping: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        method: formData.shippingMethod
      },
      items: cartItems,
      payment: paymentData,
      totals: {
        subtotal,
        shipping,
        tax,
        total
      },
      date: new Date().toISOString()
    };
    
    onOrderComplete(order);
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            className="step-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3>Customer Information</h3>
            <p>Please provide your contact information</p>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            className="step-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3>Shipping Information</h3>
            <p>Where should we deliver your order?</p>
            
            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'error' : ''}
                placeholder="Enter your street address"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={errors.city ? 'error' : ''}
                  placeholder="Enter your city"
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={errors.state ? 'error' : ''}
                  placeholder="Enter your state"
                />
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={errors.zipCode ? 'error' : ''}
                  placeholder="Enter your ZIP code"
                />
                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
              </div>
            </div>
            
            <div className="shipping-methods">
              <h4>Shipping Method</h4>
              <div className="shipping-options">
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`shipping-option ${formData.shippingMethod === option.id ? 'selected' : ''}`}
                    onClick={() => handleInputChange('shippingMethod', option.id)}
                  >
                    <div className="option-icon">
                      <option.icon />
                    </div>
                    <div className="option-details">
                      <div className="option-name">{option.name}</div>
                      <div className="option-delivery">{option.delivery}</div>
                    </div>
                    <div className="option-price">${option.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            className="step-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3>Payment Information</h3>
            <p>Complete your purchase securely</p>
            
            <SpreedlyPayment
              amount={total}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            className="step-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3>Order Review</h3>
            <p>Please review your order before completing</p>
            
            <div className="review-sections">
              <div className="review-section">
                <h4>Customer Information</h4>
                <div className="review-info">
                  <p><strong>{formData.firstName} {formData.lastName}</strong></p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>
              </div>
              
              <div className="review-section">
                <h4>Shipping Address</h4>
                <div className="review-info">
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  <p>United States</p>
                </div>
              </div>
              
              <div className="review-section">
                <h4>Shipping Method</h4>
                <div className="review-info">
                  <p>{shippingOptions.find(opt => opt.id === formData.shippingMethod)?.name}</p>
                  <p>{shippingOptions.find(opt => opt.id === formData.shippingMethod)?.delivery}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div
        className="checkout-modal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <div className="checkout-header">
          <button className="close-btn" onClick={onClose}>
            <FiArrowLeft />
            Back to Cart
          </button>
          <h2>Checkout</h2>
        </div>

        <div className="checkout-content">
          <div className="checkout-main">
            {/* Progress Steps */}
            <div className="progress-steps">
              {steps.map((step, index) => (
                <div key={step.id} className="step-container">
                  <div
                    className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                    onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                  >
                    {currentStep > step.id ? (
                      <FiCheck />
                    ) : (
                      <step.icon />
                    )}
                  </div>
                  <span className="step-title">{step.title}</span>
                  {index < steps.length - 1 && (
                    <div className={`step-line ${currentStep > step.id ? 'completed' : ''}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="step-content-container">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="step-navigation">
                {currentStep > 1 && (
                  <button className="btn btn-secondary" onClick={handleBack}>
                    <FiArrowLeft />
                    Back
                  </button>
                )}
                <button className="btn btn-primary" onClick={handleNext}>
                  {currentStep === 3 ? 'Complete Payment' : 'Continue'}
                  <FiArrowRight />
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-category">{item.category}</p>
                    <div className="item-meta">
                      <span className="item-quantity">Qty: {item.quantity}</span>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="order-security">
              <div className="security-badge">
                <FiCheck />
                <span>Secure Checkout</span>
              </div>
              <div className="security-badge">
                <FiCheck />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout; 