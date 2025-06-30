import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../utils/imageUtils';
import SpreedlyPayment from '../SpreedlyPayment/SpreedlyPayment';
import './Catalog.css';

const Catalog = ({ onAddToCart }) => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Educational Building Blocks",
      category: "Educational",
      ageRange: { min: 3, max: 8 },
      price: 29.99,
      image: "building-blocks",
      description: "Colorful building blocks that help develop motor skills and creativity."
    },
    {
      id: 2,
      name: "Plush Teddy Bear",
      category: "Plush",
      ageRange: { min: 0, max: 5 },
      price: 19.99,
      image: "teddy-bear",
      description: "Soft and cuddly teddy bear perfect for bedtime companions."
    },
    {
      id: 3,
      name: "Science Experiment Kit",
      category: "Educational",
      ageRange: { min: 8, max: 12 },
      price: 39.99,
      image: "science-kit",
      description: "Fun and safe science experiments for curious young minds."
    },
    {
      id: 4,
      name: "Art Supplies Set",
      category: "Creative",
      ageRange: { min: 4, max: 10 },
      price: 24.99,
      image: "art-supplies",
      description: "Complete art set with paints, brushes, and paper for budding artists."
    },
    {
      id: 5,
      name: "Musical Instruments Pack",
      category: "Musical",
      ageRange: { min: 2, max: 8 },
      price: 34.99,
      image: "musical-instruments",
      description: "A variety of child-safe musical instruments to explore sounds."
    },
    {
      id: 6,
      name: "Puzzle Collection",
      category: "Educational",
      ageRange: { min: 3, max: 12 },
      price: 27.99,
      image: "puzzle",
      description: "Assorted puzzles of varying difficulty levels for all ages."
    },
    {
      id: 7,
      name: "Dress-Up Costumes",
      category: "Creative",
      ageRange: { min: 3, max: 8 },
      price: 22.99,
      image: "dress-up",
      description: "Imaginative dress-up costumes for role-playing adventures."
    },
    {
      id: 8,
      name: "Outdoor Sports Set",
      category: "Active",
      ageRange: { min: 5, max: 12 },
      price: 44.99,
      image: "sports-set",
      description: "Safe outdoor sports equipment for active play and exercise."
    }
  ];

  const sortOptions = [
    { value: 'newest', label: t('catalog.sort.newest') },
    { value: 'priceLow', label: t('catalog.sort.priceLow') },
    { value: 'priceHigh', label: t('catalog.sort.priceHigh') },
    { value: 'name', label: t('catalog.sort.name') },
    { value: 'popular', label: t('catalog.sort.popular') }
  ];

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowPayment(false);
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    handleCloseModal();
    // You can add additional logic here like redirecting to order confirmation
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // You can add error handling logic here
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popular':
        return Math.random() - 0.5; // Simulate popularity
      default:
        return 0;
    }
  });

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <div className="catalog-title">
          <h1>{t('catalog.title')}</h1>
          <p>{t('catalog.subtitle')}</p>
        </div>
        
        <div className="catalog-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="catalog-content">
        {/* Products Grid */}
        <main className="products-grid">
          {sortedProducts.length === 0 ? (
            <div className="empty-state">
              <h3>{t('catalog.empty.title')}</h3>
              <p>{t('catalog.empty.subtitle')}</p>
            </div>
          ) : (
            sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="product-image">
                  <img src={getImageUrl(product.image)} alt={product.name} />
                  <div className="product-overlay">
                    <button 
                      className="overlay-btn quick-view"
                      onClick={() => handleQuickView(product)}
                      title={t('catalog.product.quickView')}
                    >
                      <FiEye />
                    </button>
                    <button 
                      className={`overlay-btn favorite ${favorites.includes(product.id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(product.id)}
                      title={favorites.includes(product.id) ? t('catalog.product.unfavorite') : t('catalog.product.favorite')}
                    >
                      <FiHeart />
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-age">
                    {t('catalog.product.ageRange', { min: product.ageRange.min, max: product.ageRange.max })}
                  </p>
                  <div className="product-price">${product.price}</div>
                  
                  <div className="product-actions">
                    <button 
                      className="btn btn-primary add-to-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FiShoppingCart />
                      {t('catalog.product.addToCart')}
                    </button>
                    <button 
                      className="btn btn-secondary buy-now"
                      onClick={() => handleBuyNow(product)}
                    >
                      {t('catalog.product.buyNow')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </main>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <motion.div
              className="product-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={handleCloseModal}>
                <FiX />
              </button>
              
              <div className="modal-content">
                <div className="modal-image">
                  <img src={getImageUrl(selectedProduct.image)} alt={selectedProduct.name} />
                </div>
                
                <div className="modal-info">
                  <h2>{selectedProduct.name}</h2>
                  <p className="modal-category">{selectedProduct.category}</p>
                  <p className="modal-age">
                    {t('catalog.product.ageRange', { 
                      min: selectedProduct.ageRange.min, 
                      max: selectedProduct.ageRange.max 
                    })}
                  </p>
                  <p className="modal-description">{selectedProduct.description}</p>
                  <div className="modal-price">${selectedProduct.price}</div>
                  
                  <div className="modal-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(selectedProduct)}
                    >
                      <FiShoppingCart />
                      {t('catalog.product.addToCart')}
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleBuyNow(selectedProduct)}
                    >
                      {t('catalog.product.buyNow')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && selectedProduct && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <motion.div
              className="payment-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={handleCloseModal}>
                <FiX />
              </button>
              
              <div className="payment-content">
                <h2>{t('payment.title')}</h2>
                <div className="payment-summary">
                  <img src={getImageUrl(selectedProduct.image)} alt={selectedProduct.name} />
                  <div>
                    <h3>{selectedProduct.name}</h3>
                    <p>${selectedProduct.price}</p>
                  </div>
                </div>
                
                <SpreedlyPayment
                  amount={selectedProduct.price}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog; 