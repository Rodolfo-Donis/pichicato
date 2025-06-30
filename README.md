# 🧸 Pichicato - Modern Toy Store

A modern, responsive React web application for a toy store with dark/light theme support, advanced shopping cart functionality, and professional payment integration.

![Pichicato Preview](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Theme Support](https://img.shields.io/badge/Theme-Dark%20%7C%20Light-purple?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Yes-green?style=for-the-badge)

## 🚀 Live Demo

Visit the live application: [https://rodolfodonis.github.io/pichicato](https://rodolfodonis.github.io/pichicato)

## ✨ Features

### 🌍 **Internationalization (i18n)**
- **Multi-Language Support**: English, Spanish, and French translations
- **Language Switcher**: Easy language switching with flag indicators
- **Automatic Detection**: Browser language detection and localStorage persistence
- **Complete Translation**: All UI text, forms, and content translated
- **RTL Ready**: Framework supports right-to-left languages

### 🎨 **Theme System**
- **Dark/Light Theme Toggle**: Seamless switching between dark and light themes
- **Persistent Theme State**: Remembers user's theme preference
- **Theme-Aware Components**: All components adapt to current theme
- **Smooth Transitions**: Elegant theme switching animations

### 🛒 **Enhanced Shopping Experience**
- **Smart Cart Management**: Add, remove, and update quantities
- **Real-time Calculations**: Automatic subtotal, shipping, and tax calculations
- **Cart Persistence**: Cart items saved across sessions
- **Quantity Controls**: Intuitive +/- buttons for item quantities
- **Empty State**: Beautiful empty cart with call-to-action

### 💳 **Professional Payment System**
- **Spreedly Integration**: Secure payment processing
- **Card Type Detection**: Automatic card type recognition
- **Real-time Validation**: Instant form validation and error handling
- **Security Badges**: Trust indicators and SSL encryption
- **Success/Error States**: Clear feedback for payment outcomes

### 🏠 **Modern Homepage**
- **Hero Section**: Engaging banner with call-to-action
- **Age Categories**: Browse toys by age groups (0-15 years)
- **Featured Products**: Highlighted best-sellers and new arrivals
- **Blog Section**: Latest news and toy-related content
- **Responsive Design**: Optimized for all device sizes

### 📱 **Responsive Design**
- **Mobile-First Approach**: Optimized for mobile devices
- **Tablet Support**: Enhanced experience on tablets
- **Desktop Optimization**: Full-featured desktop experience
- **Touch-Friendly**: Optimized for touch interactions

### 🎯 **Product Catalog Features**
- **Grid Layout**: Clean, organized product display
- **Quick Actions**: Add to cart, favorites, and quick view
- **Buy Now Option**: Direct purchase without cart
- **Category Filtering**: Filter by age groups and categories
- **Search Functionality**: Find products quickly

### 🚀 **Enhanced Checkout System**
- **Multi-Step Process**: 4-step checkout flow (Customer Info → Shipping → Payment → Review)
- **Progress Indicator**: Visual progress tracking with step completion
- **Form Validation**: Real-time validation with error messages
- **Shipping Options**: Multiple shipping methods with pricing
- **Order Summary**: Real-time order summary with item details
- **Security Features**: SSL encryption and secure payment processing
- **Order Confirmation**: Detailed confirmation with next steps
- **Responsive Design**: Optimized for all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pichicato.git
   cd pichicato
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Spreedly API keys:
   ```env
   REACT_APP_SPREEDLY_ENVIRONMENT_KEY=your_environment_key
   REACT_APP_SPREEDLY_ACCESS_TOKEN=your_access_token
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
Pichicato/
├── public/
│   └── index.html
├── src/
│   ├── contexts/
│   │   └── ThemeContext.js          # Theme management
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.js           # Navigation with theme toggle
│   │   │   └── Header.css
│   │   ├── Home/
│   │   │   ├── Home.js             # Landing page
│   │   │   └── Home.css
│   │   ├── Catalog/
│   │   │   ├── Catalog.js          # Product catalog
│   │   │   └── Catalog.css
│   │   ├── Cart/
│   │   │   ├── Cart.js             # Shopping cart
│   │   │   └── Cart.css
│   │   ├── SpreedlyPayment/
│   │   │   ├── SpreedlyPayment.js  # Payment processing
│   │   │   └── SpreedlyPayment.css
│   │   ├── Account/
│   │   │   ├── Account.js          # User account
│   │   │   └── Account.css
│   │   ├── About/
│   │   │   ├── About.js            # About page
│   │   │   └── About.css
│   │   ├── Checkout/
│   │   └── OrderConfirmation/
│   ├── utils/
│   │   └── imageUtils.js           # Image management
│   ├── App.js                      # Main app component
│   ├── App.css                     # App styles
│   ├── index.js                    # Entry point
│   └── index.css                   # Global styles
├── package.json
├── env.example
└── README.md
```

## 🎨 Theme System

### Dark Theme (Default)
- **Primary Background**: Deep black (#0a0a0a)
- **Secondary Background**: Dark gray (#1a1a1a)
- **Text**: White and light gray
- **Accent**: Purple gradient (#667eea to #764ba2)

### Light Theme
- **Primary Background**: White (#ffffff)
- **Secondary Background**: Light gray (#f8f9fa)
- **Text**: Dark gray and black
- **Accent**: Same purple gradient for consistency

### Theme Switching
- Click the sun/moon icon in the header
- Theme preference is saved in localStorage
- Smooth transitions across all components

## 🖼️ Image Management

### Development Mode
- Uses random images from Unsplash API
- Dynamic image loading for variety
- No local image storage required

### Production Mode
- Local image storage for performance
- Optimized image loading
- CDN-ready image paths

### Configuration
```javascript
// In utils/imageUtils.js
const isDevelopment = process.env.NODE_ENV === 'development';

export const getRandomImage = (query) => {
  if (isDevelopment) {
    return `https://source.unsplash.com/400x300/?${query}`;
  }
  return `/images/${query}.jpg`; // Local images in production
};
```

## 💳 Payment Integration

### Spreedly Setup
1. Create a Spreedly account
2. Get your environment key and access token
3. Add them to your `.env` file
4. Test with Spreedly's sandbox environment

### Features
- **Card Validation**: Real-time card number validation
- **Security**: PCI-compliant payment processing
- **Error Handling**: Comprehensive error messages
- **Success Flow**: Clear success confirmation

### Testing
Use these test card numbers:
- **Visa**: 4111111111111111
- **Mastercard**: 5555555555554444
- **Amex**: 378282246310005

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

## 📦 Dependencies

### Core Dependencies
- **React**: 18.2.0 - UI library
- **React Router**: 6.8.0 - Navigation
- **Framer Motion**: 10.0.0 - Animations
- **React Icons**: 4.8.0 - Icon library
- **Axios**: 1.3.0 - HTTP client

### Development Dependencies
- **Create React App**: 5.0.1 - Build tool
- **React Scripts**: 5.0.1 - Development scripts

## 🎯 Key Features

### Shopping Cart
- ✅ Add/remove items
- ✅ Quantity adjustment
- ✅ Real-time total calculation
- ✅ Shipping cost inclusion
- ✅ Persistent cart state
- ✅ Beautiful animations

### Product Catalog
- ✅ Age-based filtering
- ✅ Category organization
- ✅ Product ratings and reviews
- ✅ Favorite system
- ✅ Quick view modals
- ✅ Buy now functionality

### Payment Processing
- ✅ Spreedly integration
- ✅ Card type detection
- ✅ Form validation
- ✅ Security indicators
- ✅ Success/error handling
- ✅ Transaction confirmation

### User Experience
- ✅ Theme switching
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error handling
- ✅ Accessibility features

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🧪 Testing

### Manual Testing Checklist
- [ ] Theme switching works on all pages
- [ ] Cart functionality (add, remove, update quantity)
- [ ] Payment form validation
- [ ] Responsive design on mobile/tablet
- [ ] Navigation between pages
- [ ] Product filtering and search
- [ ] Form submissions and error handling

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### Code Style
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Add comments for complex logic
- Keep components focused and reusable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash**: For beautiful random images in development
- **React Icons**: For the comprehensive icon library
- **Framer Motion**: For smooth animations
- **Spreedly**: For secure payment processing

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@pichicato.com
- Documentation: [docs.pichicato.com](https://docs.pichicato.com)

## 🔄 Changelog

### v2.0.0 (Latest)
- ✨ Added dark/light theme system
- 🛒 Enhanced cart design and functionality
- 💳 Improved payment processing with Spreedly
- 🎨 Modern UI redesign across all components
- 📱 Better responsive design
- ⚡ Performance optimizations

### v1.0.0
- 🎉 Initial release
- 📦 Basic React application structure
- 🛍️ Simple product catalog
- 🛒 Basic shopping cart
- 💳 Payment integration setup

---

**Made with ❤️ for toy lovers everywhere** 