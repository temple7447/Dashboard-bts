# BTS Dashboard 📡

A comprehensive Base Transceiver Station (BTS) analysis and monitoring dashboard built with React. This application provides tools for analyzing cellular network coverage, path loss calculations, and population density mapping.

## 🚀 Features

- **Interactive Google Maps Integration**: Visualize BTS locations and coverage areas
- **Path Loss Calculations**: Support for multiple propagation models including:
  - Free Space Path Loss
  - Hata Model
  - Egli Model
  - Modified models for various terrains
- **Population Analysis**: Population density mapping and analysis
- **Real-time Data**: Integration with backend API for live data
- **Elevation Analysis**: Terrain elevation consideration for path loss
- **Chart Visualizations**: Interactive charts using Chart.js and Victory
- **Responsive Design**: Built with Tailwind CSS and Flowbite components

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router DOM
- **Maps**: Google Maps API with React Google Maps
- **Styling**: Tailwind CSS, Flowbite React
- **Charts**: Chart.js, React Chart.js 2, Victory
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Database**: Firebase Firestore
- **Notifications**: React Toastify

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (version 14 or higher)
- npm or yarn package manager
- Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Elevation API
- Firebase project setup

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Dashboard-bts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Fill in your API keys and configuration:
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   # ... other Firebase config
   REACT_APP_BACKEND_URL=your_backend_api_url
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

## 🚦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the test runner |
| `npm run build` | Builds the app for production |
| `npm run lint` | Runs ESLint to check code quality |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API services and Firebase config
├── utils/              # Utility functions
├── constants/          # App constants and configuration
├── Component/          # Feature-specific components
└── ...
```

## 🔐 Security Features

- Environment variables for sensitive data
- Firebase security rules
- API key restrictions
- Input validation and sanitization

## 🧮 Path Loss Models

The application supports multiple propagation models:

1. **Free Space Path Loss**: Ideal for line-of-sight scenarios
2. **Hata Model**: Urban and suburban environments
3. **Egli Model**: Irregular terrain analysis
4. **Modified Models**: Custom implementations for specific use cases

## 🌍 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Environment Variables for Production
Ensure all required environment variables are set in your deployment environment.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Future Enhancements

- [ ] TypeScript migration
- [ ] PWA support
- [ ] Offline capabilities
- [ ] Advanced analytics
- [ ] Export functionality
- [ ] Multi-language support
