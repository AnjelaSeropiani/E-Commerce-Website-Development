import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { convertAndFormatPrice } from '../../utils/currency';
import '../../styles/ShippingMethod.css';

const ShippingMethod = () => {
    const navigate = useNavigate();
    const { cart, shippingInfo, selectedCurrency, shippingMethod, setShippingMethod } = useShop();
    const [selectedMethod, setSelectedMethod] = useState(shippingMethod ? shippingMethod.name.toLowerCase() : 'standard');

    // Define shipping methods
    const shippingMethods = {
        standard: { name: 'Standard Shipping', price: 0 },
        express: { name: 'Express Shipping', price: 4.99 }
    };

    // Update context shippingMethod when selectedMethod changes
    useEffect(() => {
        setShippingMethod(shippingMethods[selectedMethod]);
    }, [selectedMethod, setShippingMethod]);

    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Format shipping address
    const formattedAddress = `${shippingInfo?.address}, ${shippingInfo?.postalCode}, ${shippingInfo?.city}, ${shippingInfo?.country}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/checkout/payment');
    };

    return (
        <div className="shipping-method-container">
            <div className="shipping-method-content">
                <div className="shipping-method-form">
                    {/* Contact and Address Summary */}
                    <div className="summary-section">
                        <div className="contact-info">
                            <label>Contact:</label>
                            <span>{shippingInfo?.contact}</span>
                        </div>
                        <div className="address-info">
                            <label>Ship to:</label>
                            <span>{formattedAddress}</span>
                        </div>
                    </div>

                    {/* Shipping Method Selection */}
                    <div className="method-section">
                        <h2>Shipping method</h2>
                        <div className="shipping-options">
                            <label className="shipping-option">
                                <input
                                    type="radio"
                                    name="shipping"
                                    value="standard"
                                    checked={selectedMethod === 'standard'}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                />
                                <div className="option-content">
                                    <span className="option-name">Standard Shipping</span>
                                    <span className="option-price">Free</span>
                                </div>
                            </label>

                            <label className="shipping-option">
                                <input
                                    type="radio"
                                    name="shipping"
                                    value="express"
                                    checked={selectedMethod === 'express'}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                />
                                <div className="option-content">
                                    <span className="option-name">Express Shipping</span>
                                    <span className="option-price">{convertAndFormatPrice(4.99, selectedCurrency)}</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        <Link to="/checkout/shipping-info" className="back-button">Back to details</Link>
                        <button onClick={handleSubmit} className="next-button">Go to payment</button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="item-image">
                                <img src={item.image} alt={item.name} />
                                <span className="item-count">{item.quantity}</span>
                            </div>
                            <div className="item-details">
                                <h4>{item.name}</h4>
                                <p className="price">{convertAndFormatPrice(item.price, selectedCurrency)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="order-totals">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span>{convertAndFormatPrice(subtotal, selectedCurrency)}</span>
                        </div>
                        <div className="shipping">
                            <span>Shipping</span>
                            <span>{selectedMethod === 'standard' ? 'Free Shipping' : convertAndFormatPrice(4.99, selectedCurrency)}</span>
                        </div>
                        <div className="total">
                            <span>Total</span>
                            <span>{convertAndFormatPrice(subtotal + (selectedMethod === 'express' ? 4.99 : 0), selectedCurrency)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingMethod;
