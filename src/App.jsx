import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import AuthProvider from './context/AuthProvider';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import TraditionalFooter from './components/TraditionalFooter';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />

        {/* Navbar and footer are shared chrome across every route */}
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          {/* Unknown paths fall back home rather than rendering a blank page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <TraditionalFooter />
      </BrowserRouter>
    </AuthProvider>
  );
}
