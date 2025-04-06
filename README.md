# Bakdient - Recipe Management Frontend

A modern web application for managing recipes with flexible measurement conversions and smart ingredient adjustments.

## 🚀 Features

- **Dynamic Recipe Management**: Browse and view detailed recipes with step-by-step instructions
- **Flexible Measurements**: Convert between different measurement units (metric, imperial, tablespoons)
- **Smart Scaling**: Automatically adjust ingredient quantities based on serving size
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface built with React and Tailwind CSS

## 🛠️ Technology Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Firebase (Firestore)
- React Router DOM 7
- Axios for API calls
- Lottie for animations
- Lucide React for icons

## 🏗️ Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Firebase account and project setup

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bakdient-frontend.git
cd bakdient-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🏭 Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
bakdient-frontend/
├── src/
│   ├── components/     # React components
│   ├── services/      # API and Firebase services
│   ├── assets/        # Static assets
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Public assets
└── vite.config.js     # Vite configuration
```

## 🔗 API Integration

The frontend connects to:

- Firebase Firestore for recipe storage
- Local Flask backend (http://127.0.0.1:5000) for ingredient management

## 🎨 Styling

- Custom design system using Tailwind CSS
- Responsive layouts
- Custom fonts: Bungee Shade, Montserrat Alternates, VT323

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ✨ Acknowledgments

- Icons by Lucide React
- Animations by LottieFiles
- UI Components inspired by Tailwind CSS
