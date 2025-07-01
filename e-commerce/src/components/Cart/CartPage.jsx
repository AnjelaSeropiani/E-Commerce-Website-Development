import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/CartPage.css';

const sizes = ['XS', 'S', 'M', 'L'];

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, addToCart, removeFromCart, updateItemSize, selectedCurrency } = useShop();

  const navigate = useNavigate();

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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSizeChange = (item, newSize) => {
    if (item.size === newSize) return;

    updateItemSize(item.id, item.size, item.color, newSize);
  };

  const handleContinue = () => {
    navigate('/checkout/shipping-info');
  };

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Cart</h1>

      <div className="cart-page-items">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="cart-page-item">
            <div className="cart-page-item-info">
              <div className="cart-page-item-brand">{item.brand}</div>
              <div className="cart-page-item-name">{item.name}</div>
              <div className="cart-page-item-price">{formatPrice(item.price)}</div>
              <div className="cart-page-item-attributes">
                {item.category !== 'accessories' && (
                  <>
                    <div>SIZE:</div>
                    <div className="size-selector">
                      {sizes.map(size => (
                        <button
                          key={size}
                          className={`size-button ${item.size === size ? 'selected' : ''}`}
                          onClick={() => handleSizeChange(item, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {item.color && <span>Color: {item.color}</span>}
              </div>
            </div>

            <div className="cart-page-item-quantity">
              <button className="cart-page-quantity-button" onClick={() => increaseQuantity(item.id, item.size, item.color)}>+</button>
              <span>{item.quantity}</span>
              <button className="cart-page-quantity-button" onClick={() => decreaseQuantity(item.id, item.size, item.color)}>-</button>
            </div>

            <img
              className="cart-page-item-image"
              src={item.image}
              alt={item.name}
            />
          </div>
        ))}
      </div>

      <div className="cart-page-total">
        <div className="cart-page-total-row">
          <span className="cart-page-total-label">Quantity:</span>
          <span className="cart-page-total-value">{quantity}</span>
        </div>
        <div className="cart-page-total-row">
          <span className="cart-page-total-label">Total:</span>
          <span className="cart-page-total-value">{formatPrice(total)}</span>
        </div>
        <button className="cart-page-order-button" onClick={handleContinue}>CONTINUE</button>
      </div>
    </div>
  );
};

export default CartPage;
