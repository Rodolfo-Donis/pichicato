import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { getRandomImage } from '../../utils/imageUtils';
import './Home.css';

const Home = () => {
  const featuredToys = [
    {
      id: 1,
      name: "Educational Building Blocks",
      price: 29.99,
      rating: 4.8,
      image: getRandomImage('building blocks'),
      category: "Educational"
    },
    {
      id: 2,
      name: "Interactive Robot Pet",
      price: 49.99,
      rating: 4.6,
      image: getRandomImage('robot toy'),
      category: "Electronic"
    },
    {
      id: 3,
      name: "Art & Craft Kit",
      price: 24.99,
      rating: 4.9,
      image: getRandomImage('art supplies'),
      category: "Creative"
    }
  ];

  const ageCategories = [
    { range: "0-2 years", image: getRandomImage('baby toys'), count: 45 },
    { range: "3-5 years", image: getRandomImage('preschool toys'), count: 67 },
    { range: "6-8 years", image: getRandomImage('elementary toys'), count: 89 },
    { range: "9-12 years", image: getRandomImage('tween toys'), count: 56 },
    { range: "13-15 years", image: getRandomImage('teen toys'), count: 34 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Educational Toys for Child Development",
      excerpt: "Discover how the right toys can enhance your child's learning and development...",
      image: getRandomImage('educational toys'),
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Top 10 STEM Toys for Kids in 2024",
      excerpt: "Explore the latest STEM toys that make learning science and technology fun...",
      image: getRandomImage('stem toys'),
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "How to Choose Age-Appropriate Toys",
      excerpt: "A comprehensive guide to selecting toys that match your child's developmental stage...",
      image: getRandomImage('toy selection'),
      date: "2024-01-05"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={i < Math.floor(rating) ? 'star filled' : 'star'}
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Welcome to Pichicato</h1>
            <p>Discover amazing toys that spark imagination, creativity, and learning for children of all ages.</p>
            <div className="hero-actions">
              <Link to="/catalog" className="btn btn-primary">
                Explore Toys
                <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Age Categories Section */}
      <section className="age-categories-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Shop by Age</h2>
            <p>Find the perfect toys for your child's developmental stage</p>
          </motion.div>

          <div className="age-categories-grid">
            {ageCategories.map((category, index) => (
              <motion.div
                key={category.range}
                className="age-category-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.range} />
                  <div className="category-overlay">
                    <span className="toy-count">{category.count} toys</span>
                  </div>
                </div>
                <div className="category-info">
                  <h3>{category.range}</h3>
                  <Link to="/catalog" className="category-link">
                    Browse Toys
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Most Popular Toys</h2>
            <p>Our best-selling toys loved by parents and children</p>
          </motion.div>

          <div className="featured-grid">
            {featuredToys.map((toy, index) => (
              <motion.div
                key={toy.id}
                className="featured-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="featured-image">
                  <img src={toy.image} alt={toy.name} />
                  <div className="featured-overlay">
                    <button className="overlay-btn favorite-btn">
                      <FiHeart />
                    </button>
                    <button className="overlay-btn cart-btn">
                      <FiShoppingCart />
                    </button>
                  </div>
                  <div className="featured-category">{toy.category}</div>
                </div>
                <div className="featured-info">
                  <h3>{toy.name}</h3>
                  <div className="featured-rating">
                    {renderStars(toy.rating)}
                    <span>({toy.rating})</span>
                  </div>
                  <div className="featured-price">${toy.price}</div>
                  <Link to="/catalog" className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Latest News & Tips</h2>
            <p>Stay updated with the latest in child development and toy trends</p>
          </motion.div>

          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link to="#" className="read-more">
                    Read More
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Find the Perfect Toy?</h2>
            <p>Join thousands of happy parents who trust Pichicato for quality toys</p>
            <Link to="/catalog" className="btn btn-primary">
              Start Shopping
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 