import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { convertAndFormatPrice } from '../../utils/currency';
import '../../styles/Confirmation.css';

const Confirmation = () => {
  const { cart, clearCart, shippingMethod, selectedCurrency } = useShop();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod ? shippingMethod.price : 0;
  const total = subtotal + shippingCost;

  const handleBackToShopping = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="confirmation-left">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/cart">Cart</Link>
            <span>›</span>
            <Link to="/checkout/shipping-info">Details</Link>
            <span>›</span>
            <Link to="/checkout/shipping-method">Shipping</Link>
            <span>›</span>
            <Link to="/checkout/payment">Payment</Link>
          </div>

          {/* Confirmation Message */}
          <div className="confirmation-message">
            <div className="confirmation-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#5ECE7B" />
                <path d="M20.5 31.5L28.5 39.5L43.5 24.5" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <h2>Payment Confirmed</h2>
            <div className="order-number">Order #2039</div>
            <button onClick={handleBackToShopping} className="back-shopping-button">
              Back to shopping
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="confirmation-summary">
          {cart.map((item, index) => (
            <div key={index} className="summary-item">
              <div className="item-image-container">
                <img src={item.image} alt={item.name} />
                <span className="item-quantity">{item.quantity}</span>
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">{convertAndFormatPrice(item.price, selectedCurrency)}</p>
              </div>
            </div>
          ))}
          <div className="summary-totals">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>{convertAndFormatPrice(subtotal, selectedCurrency)}</span>
            </div>
            <div className="shipping">
              <span>Shipping</span>
              <span>{shippingMethod ? (shippingMethod.price === 0 ? 'Free Shipping' : convertAndFormatPrice(shippingMethod.price, selectedCurrency)) : 'Free Shipping'}</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>{convertAndFormatPrice(total, selectedCurrency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
