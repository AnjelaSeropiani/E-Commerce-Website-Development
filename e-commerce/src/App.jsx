import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ProductListing from './components/ProductListing/ProductListing';
import ProductDetail from './components/ProductListing/ProductDetail';
import CartPage from './components/Cart/CartPage';
// import CartOverlay from './components/Cart/CartOverlay'; // Removed unused import
import ShippingInfo from './components/Checkout/ShippingInfo';
import ShippingMethod from './components/Checkout/ShippingMethod';
import Payment from './components/Checkout/Payment';
import Confirmation from './components/Checkout/Confirmation';
import { ShopProvider, useShop } from './context/ShopContext';
import './App.css';

// Main app content separated to access context
const AppContent = () => {
    const { selectedCurrency, setSelectedCurrency } = useShop();

    // Navigation data
    const categories = ['women', 'men', 'accessories'];
    const currencies = ['USD', 'EUR', 'JPY'];

    return (
        <div className="App">
            <Navigation
                categories={categories}
                currencies={currencies}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
            />

            <Routes>
                <Route path="/" element={<Navigate to="/women" replace />} />
                <Route path="/:category" element={<ProductListing />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout/shipping-info" element={<ShippingInfo />} />
                <Route path="/checkout/shipping-method" element={<ShippingMethod />} />
                <Route path="/checkout/payment" element={<Payment />} />
                <Route path="/checkout/confirmation" element={<Confirmation />} />
            </Routes>
        </div>
    );
};

// Main App component
function App() {
    return (
        <ShopProvider>
            <Router>
                <AppContent />
            </Router>
        </ShopProvider>
    );
}

export default App;
