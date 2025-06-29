// Image utility functions for managing images in development vs production

// Development images from Unsplash (random toy-related images)
const DEV_IMAGES = {
  // Building and construction toys
  building: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&crop=center'
  ],
  
  // Educational and science toys
  educational: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center'
  ],
  
  // Art and creative toys
  creative: [
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&crop=center'
  ],
  
  // Plush toys
  plush: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&crop=center'
  ],
  
  // Musical toys
  musical: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center'
  ],
  
  // Active/Outdoor toys
  active: [
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&crop=center'
  ],
  
  // Blog images
  blog: [
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center'
  ]
};

// Production image paths (to be used when images are stored locally)
const PROD_IMAGES = {
  // Example structure for production images
  // building: ['/images/toys/building-1.jpg', '/images/toys/building-2.jpg'],
  // educational: ['/images/toys/educational-1.jpg', '/images/toys/educational-2.jpg'],
  // creative: ['/images/toys/creative-1.jpg', '/images/toys/creative-2.jpg'],
  // blog: ['/images/blog/blog-1.jpg', '/images/blog/blog-2.jpg']
};

/**
 * Get image URL based on image name and environment
 * @param {string} imageName - The name of the image (e.g., 'building-blocks', 'teddy-bear')
 * @returns {string} - Image URL or path
 */
export const getImageUrl = (imageName) => {
  if (process.env.NODE_ENV === 'development') {
    // In development, map image names to categories and use existing images
    const categoryMap = {
      'building-blocks': 'building',
      'teddy-bear': 'plush',
      'science-kit': 'educational',
      'art-supplies': 'creative',
      'musical-instruments': 'musical',
      'puzzle': 'educational',
      'dress-up': 'creative',
      'sports-set': 'active'
    };
    
    const category = categoryMap[imageName] || 'building';
    const images = DEV_IMAGES[category] || DEV_IMAGES.building;
    return images[Math.floor(Math.random() * images.length)];
  } else {
    // In production, use local image paths
    return `/images/${imageName}.jpg`;
  }
};

/**
 * Get a random image for a specific category
 * @param {string} category - The image category
 * @param {boolean} isDev - Whether we're in development mode
 * @returns {string} - Image URL or path
 */
export const getRandomImage = (category, isDev = process.env.NODE_ENV === 'development') => {
  if (isDev) {
    const images = DEV_IMAGES[category] || DEV_IMAGES.building;
    return images[Math.floor(Math.random() * images.length)];
  } else {
    const images = PROD_IMAGES[category] || PROD_IMAGES.building;
    return images ? images[Math.floor(Math.random() * images.length)] : '/images/toys/default.jpg';
  }
};

/**
 * Get a specific image by index for a category
 * @param {string} category - The image category
 * @param {number} index - The image index
 * @param {boolean} isDev - Whether we're in development mode
 * @returns {string} - Image URL or path
 */
export const getImageByIndex = (category, index, isDev = process.env.NODE_ENV === 'development') => {
  if (isDev) {
    const images = DEV_IMAGES[category] || DEV_IMAGES.building;
    return images[index % images.length];
  } else {
    const images = PROD_IMAGES[category] || PROD_IMAGES.building;
    return images ? images[index % images.length] : '/images/toys/default.jpg';
  }
};

/**
 * Get all images for a category
 * @param {string} category - The image category
 * @param {boolean} isDev - Whether we're in development mode
 * @returns {Array} - Array of image URLs or paths
 */
export const getAllImages = (category, isDev = process.env.NODE_ENV === 'development') => {
  if (isDev) {
    return DEV_IMAGES[category] || DEV_IMAGES.building;
  } else {
    return PROD_IMAGES[category] || PROD_IMAGES.building || ['/images/toys/default.jpg'];
  }
};

/**
 * Get product image based on product category
 * @param {Object} product - Product object with category
 * @param {number} index - Optional index for consistent image selection
 * @returns {string} - Image URL or path
 */
export const getProductImage = (product, index = null) => {
  const category = product.category?.toLowerCase() || 'building';
  
  // Map product categories to image categories
  const categoryMap = {
    'construction': 'building',
    'educational': 'educational',
    'creative': 'creative',
    'art': 'creative',
    'musical': 'musical',
    'stem': 'educational',
    'electronic': 'building',
    'games': 'building',
    'plush': 'plush',
    'outdoor': 'active',
    'active': 'active'
  };
  
  const imageCategory = categoryMap[category] || 'building';
  
  if (index !== null) {
    return getImageByIndex(imageCategory, index);
  }
  
  return getRandomImage(imageCategory);
};

/**
 * Get blog image by index
 * @param {number} index - Blog post index
 * @returns {string} - Image URL or path
 */
export const getBlogImage = (index) => {
  return getImageByIndex('blog', index);
}; 