# Pichicato - Modern Toy Store

A beautiful, modern toy store web application built with React, featuring a responsive design, internationalization, and payment integration.

## 🚀 Live Demo

Visit the live application: [https://rodolfodonis.github.io/pichicato](https://rodolfodonis.github.io/pichicato)

## ✨ Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Multi-language Support**: English and Spanish (French removed)
- **Product Catalog**: Browse toys with larger product cards and no filter popup
- **Shopping Cart**: Add items and manage your cart
- **Payment Integration**: Secure payment processing with Spreedly
- **Dark/Light Theme**: Toggle between themes
- **Mobile Responsive**: Works perfectly on all devices
- **High-Quality Images**: Unsplash integration for beautiful product images
- **GitHub Actions**: Automated deployment to GitHub Pages

## 🎯 Recent Updates

- ✅ **Removed filter popup** from catalog section for cleaner UI
- ✅ **Increased product card size** for better visual appeal
- ✅ **Fixed image display** - now uses development environment images for consistent display
- ✅ **Removed French translation** - now supports English and Spanish only
- ✅ **GitHub Actions deployment** - automated build and deployment
- ✅ **ESLint fixes** - resolved all build warnings and errors

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: CSS3 with custom properties and animations
- **Animations**: Framer Motion
- **Internationalization**: i18next
- **Icons**: React Icons (Feather Icons)
- **Payment**: Spreedly integration
- **Deployment**: GitHub Actions + GitHub Pages

## 📱 Screenshots

![Pichicato Toy Store](https://img.shields.io/badge/Status-Live-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20ES-orange?style=for-the-badge)
![Theme Support](https://img.shields.io/badge/Theme-Dark%20%7C%20Light-purple?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Yes-green?style=for-the-badge)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rodolfo-Donis/pichicato.git
   cd pichicato
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About/          # About page component
│   ├── Account/        # Account management
│   ├── Cart/           # Shopping cart
│   ├── Catalog/        # Product catalog (updated)
│   ├── Checkout/       # Checkout process
│   ├── Header/         # Navigation header
│   ├── Home/           # Home page
│   ├── LanguageSwitcher/ # Language selection
│   ├── OrderConfirmation/ # Order confirmation
│   └── SpreedlyPayment/ # Payment integration
├── contexts/           # React contexts
├── locales/            # Translation files
├── utils/              # Utility functions
└── App.js              # Main application component
```

## 🌐 Internationalization

The application supports multiple languages:
- **English** (en) - Default language
- **Spanish** (es) - Español

Language switching is available through the language switcher in the header.

## 🎨 Theming

The application supports both light and dark themes:
- **Light Theme**: Clean, bright interface
- **Dark Theme**: Modern, eye-friendly dark mode

Theme preference is automatically saved and restored.

## 🛒 Features

### Product Catalog
- **Large product cards** for better visibility
- **No filter popup** - cleaner interface
- **Product categories**: Educational, Plush, Creative, Musical, Active
- **Quick view** and **favorite** functionality
- **Add to cart** and **buy now** options

### Shopping Cart
- **Persistent cart** - items saved in localStorage
- **Quantity management**
- **Remove items**
- **Cart total calculation**

### Checkout Process
- **Multi-step checkout**
- **Customer information**
- **Shipping options**
- **Payment integration**
- **Order confirmation**

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_SPREEDLY_ENVIRONMENT_KEY=your_spreedly_key
REACT_APP_SPREEDLY_ACCESS_TOKEN=your_access_token
```

### Payment Configuration

The application uses Spreedly for payment processing. Configure your Spreedly credentials in the environment variables.

## 🚀 Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions:

1. **Push to main branch** triggers the deployment
2. **GitHub Actions** builds the application
3. **Deploys to GitHub Pages** at `https://rodolfodonis.github.io/pichicato`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for high-quality images
- **React Icons** for beautiful icons
- **Framer Motion** for smooth animations
- **i18next** for internationalization

## 📞 Support

If you have any questions or need support, please open an issue on GitHub.

---

**Pichicato** - Making toy shopping fun and modern! 🧸✨