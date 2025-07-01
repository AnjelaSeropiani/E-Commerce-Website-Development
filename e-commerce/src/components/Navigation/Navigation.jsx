import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import CartOverlay from '../Cart/CartOverlay';
import BreadcrumbNav from './BreadcrumbNav';
import '../../styles/Navigation.css';

const Navigation = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const location = useLocation();
  const { cart, selectedCurrency, setSelectedCurrency } = useShop();
  const currencyRef = useRef(null);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isCheckoutPage = location.pathname.includes('/checkout');

  const currencies = [
    { symbol: '$', code: 'USD' },
    { symbol: '€', code: 'EUR' },
    { symbol: '¥', code: 'JPY' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.code);
    setIsCurrencyOpen(false);
  };

  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  return (
    <nav className="nav">
      <div className="nav-container">
        {isCheckoutPage ? (
          <BreadcrumbNav />
        ) : (
          <div className="nav-content">
            <ul className="nav-links">
              <li className="nav-item">
                <Link to="/women" className={`nav-link ${location.pathname === '/women' ? 'active' : ''}`}>
                  WOMEN
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/men" className={`nav-link ${location.pathname === '/men' ? 'active' : ''}`}>
                  MEN
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/accessories" className={`nav-link ${location.pathname === '/accessories' ? 'active' : ''}`}>
                  ACCESSORIES
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="nav-right">
          <div className="currency-selector" ref={currencyRef}>
            <button
              className="currency-button"
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
            >
              <span>{currentCurrency.symbol}</span>
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`arrow ${isCurrencyOpen ? 'up' : ''}`}
              >
                <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isCurrencyOpen && (
              <div className="currency-dropdown">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    className={`currency-option ${currency.code === selectedCurrency ? 'selected' : ''}`}
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    {currency.symbol} {currency.code}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="cart-button"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33693 19.5613 4.87359ZM18.6566 6.22252L17.0773 12.4245C16.9934 12.7265 16.7195 12.9279 16.4036 12.9279H8.00154C7.68569 12.9279 7.41178 12.7265 7.32789 12.4245L5.49611 5.39756H17.983C18.1936 5.39756 18.4042 5.49824 18.5308 5.65948C18.6567 5.81994 18.7192 6.0213 18.6567 6.22252H18.6566Z" fill="#43464E" />
              <path d="M8.44437 14.9814C7.2443 14.9814 6.25488 15.9276 6.25488 17.0751C6.25488 18.2226 7.24439 19.1688 8.44437 19.1688C9.64445 19.1696 10.6339 18.2234 10.6339 17.0757C10.6339 15.928 9.64436 14.9814 8.44437 14.9814Z" fill="#43464E" />
              <path d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9276 13.498 17.0751C13.498 18.2226 14.4876 19.1688 15.6875 19.1688C16.8875 19.1696 17.877 18.2234 17.877 17.0757C17.877 15.928 16.8875 14.9814 15.6875 14.9814Z" fill="#43464E" />
            </svg>
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </button>

          {isCartOpen && (
            <>
              <div className="backdrop" onClick={() => setIsCartOpen(false)}></div>
              <CartOverlay onClose={() => setIsCartOpen(false)} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 