import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';
import './Cart.css';

const Cart = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 5.99 : 0;
  const finalTotal = total + shipping;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleOrderComplete = (order) => {
    setCompletedOrder(order);
    setOrderComplete(true);
    setShowCheckout(false);
    // Clear cart after successful order
    items.forEach(item => onRemove(item.id));
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const handleCloseCart = () => {
    onClose();
    setOrderComplete(false);
    setCompletedOrder(null);
  };

  if (showCheckout) {
    return (
      <Checkout
        cartItems={items}
        onClose={handleCloseCheckout}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (orderComplete && completedOrder) {
    return (
      <div className="modal-overlay" onClick={handleCloseCart}>
        <OrderConfirmation
          order={completedOrder}
          onClose={handleCloseCart}
          isModal={true}
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            className="cart-modal"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="cart-header">
              <div className="cart-title">
                <FiShoppingBag className="cart-icon" />
                <h2>Your Cart</h2>
                <span className="cart-count">({items.length} items)</span>
              </div>
              <button className="modal-close" onClick={onClose}>
                <FiX />
              </button>
            </div>

            {items.length === 0 ? (
              <motion.div 
                className="cart-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any toys to your cart yet.</p>
                <Link to="/catalog" className="btn btn-primary" onClick={onClose}>
                  Start Shopping
                  <FiArrowRight />
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="cart-items">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 }}
                        layout
                      >
                        <div className="cart-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p className="item-category">{item.category}</p>
                          <div className="cart-item-details">
                            <span className="item-price">${item.price}</span>
                            <div className="cart-quantity">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="quantity-btn"
                              >
                                -
                              </button>
                              <span className="quantity">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="quantity-btn"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                          <button 
                            className="cart-remove" 
                            onClick={() => onRemove(item.id)}
                            title="Remove item"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button className="btn btn-secondary continue-shopping" onClick={onClose}>
                    Continue Shopping
                  </button>
                  <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                    <FiArrowRight />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cart; 