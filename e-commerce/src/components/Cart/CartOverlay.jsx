import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import '../../styles/CartOverlay.css';

const CartOverlay = ({ onClose }) => {
  const { cart, increaseQuantity, decreaseQuantity, selectedCurrency } = useShop();

  const formatPrice = (price) => {
    const exchangeRates = {
      USD: 1,
      EUR: 0.85,
      JPY: 110
    };

    const symbols = {
      USD: '$',
      EUR: '€',
      JPY: '¥'
    };

    const convertedPrice = price * exchangeRates[selectedCurrency];
    return `${symbols[selectedCurrency]}${selectedCurrency === 'JPY' ? Math.round(convertedPrice) : convertedPrice.toFixed(2)}`;
  };

  if (cart.length === 0) {
    return (
      <div className="cart-overlay">
        <div className="cart-overlay-header">
          <span>My Bag,</span> 0 items
        </div>
        <div className="cart-overlay-empty">Your cart is empty</div>
      </div>
    );
  }

  return (
    <div className="cart-overlay">
      <div className="cart-overlay-header">
        <span>My Bag,</span> {cart.length} items
      </div>

      <div className="cart-overlay-items">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="cart-overlay-item">
            <div className="cart-overlay-item-info">
              {/* Removed brand display */}
              <div className="cart-overlay-item-name">{item.name}</div>
              <div className="cart-overlay-item-price">{formatPrice(item.price)}</div>
              <div className="cart-overlay-item-attributes">
                {/* Show selected size as a single button */}
                {item.size && (
                  <div className="size-options">
                    <button className="size-button selected" disabled>
                      {item.size}
                    </button>
                  </div>
                )}
                {/* Color display can be removed or styled similarly if needed */}
              </div>
            </div>

            <div className="cart-overlay-item-quantity">
              <button className="quantity-button" onClick={() => increaseQuantity(item.id, item.size, item.color)}>+</button>
              <span>{item.quantity}</span>
              <button className="quantity-button" onClick={() => decreaseQuantity(item.id, item.size, item.color)}>-</button>
            </div>

            <img
              className="cart-overlay-item-image"
              src={item.image}
              alt={item.name}
            />
          </div>
        ))}
      </div>

      <div className="cart-overlay-total">
        <span>Total</span>
        <span>{formatPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}</span>
      </div>

      <div className="cart-overlay-buttons">
        <Link to="/cart">
          <button className="view-bag-button" onClick={onClose}>
            VIEW BAG
          </button>
        </Link>
        <Link to="/checkout/shipping-info">
          <button className="checkout-button" onClick={onClose}>
            CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartOverlay;
