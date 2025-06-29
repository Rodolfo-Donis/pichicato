import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiTruck, FiMail, FiMapPin, FiCalendar, FiPackage } from 'react-icons/fi';
import './OrderConfirmation.css';

const OrderConfirmation = ({ order, onClose, isModal = false }) => {
  if (!order) return null;

  const estimatedDelivery = () => {
    const orderDate = new Date(order.date);
    const shippingMethod = order.shipping.method;
    
    switch (shippingMethod) {
      case 'standard':
        orderDate.setDate(orderDate.getDate() + 5);
        break;
      case 'express':
        orderDate.setDate(orderDate.getDate() + 2);
        break;
      case 'overnight':
        orderDate.setDate(orderDate.getDate() + 1);
        break;
      default:
        orderDate.setDate(orderDate.getDate() + 5);
    }
    
    return orderDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getShippingMethodName = (method) => {
    switch (method) {
      case 'standard':
        return 'Standard Shipping';
      case 'express':
        return 'Express Shipping';
      case 'overnight':
        return 'Overnight Shipping';
      default:
        return 'Standard Shipping';
    }
  };

  const Container = isModal ? 'div' : 'div';
  const containerProps = isModal ? { className: 'order-confirmation-modal' } : { className: 'order-confirmation-page' };

  return (
    <Container {...containerProps}>
      <motion.div
        className="confirmation-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="confirmation-header">
          <div className="success-badge">
            <FiCheck />
          </div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        {/* Order Summary */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="order-details-grid">
            <div className="order-detail">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">{order.id}</span>
            </div>
            <div className="order-detail">
              <span className="detail-label">Order Date</span>
              <span className="detail-value">
                {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="order-detail">
              <span className="detail-label">Total Amount</span>
              <span className="detail-value total-amount">${order.totals.total.toFixed(2)}</span>
            </div>
            <div className="order-detail">
              <span className="detail-label">Payment Status</span>
              <span className="detail-value status-paid">Paid</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="info-section">
          <h3>Customer Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <FiMail className="info-icon" />
              <div className="info-content">
                <span className="info-label">Email</span>
                <span className="info-value">{order.customer.email}</span>
              </div>
            </div>
            <div className="info-item">
              <FiPackage className="info-icon" />
              <div className="info-content">
                <span className="info-label">Phone</span>
                <span className="info-value">{order.customer.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="info-section">
          <h3>Shipping Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <FiMapPin className="info-icon" />
              <div className="info-content">
                <span className="info-label">Shipping Address</span>
                <span className="info-value">
                  {order.shipping.address}<br />
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}<br />
                  {order.shipping.country}
                </span>
              </div>
            </div>
            <div className="info-item">
              <FiTruck className="info-icon" />
              <div className="info-content">
                <span className="info-label">Shipping Method</span>
                <span className="info-value">{getShippingMethodName(order.shipping.method)}</span>
              </div>
            </div>
            <div className="info-item">
              <FiCalendar className="info-icon" />
              <div className="info-content">
                <span className="info-label">Estimated Delivery</span>
                <span className="info-value">{estimatedDelivery()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="order-items-section">
          <h3>Order Items</h3>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-category">{item.category}</p>
                  <div className="item-meta">
                    <span className="item-quantity">Quantity: {item.quantity}</span>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Totals */}
        <div className="order-totals-section">
          <h3>Order Totals</h3>
          <div className="totals-grid">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${order.totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>${order.totals.shipping.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>${order.totals.tax.toFixed(2)}</span>
            </div>
            <div className="total-row total">
              <span>Total</span>
              <span>${order.totals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps-section">
          <h3>What's Next?</h3>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Order Confirmation Email</h4>
                <p>You'll receive a confirmation email with your order details shortly.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Order Processing</h4>
                <p>We'll process your order and prepare it for shipping within 24 hours.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Shipping Notification</h4>
                <p>You'll receive a shipping confirmation with tracking information.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Delivery</h4>
                <p>Your order will be delivered to your specified address.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="confirmation-actions">
          {isModal && (
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          )}
          <Link to="/catalog" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link to="/account" className="btn btn-secondary">
            View My Orders
          </Link>
        </div>
      </motion.div>
    </Container>
  );
};

export default OrderConfirmation; 