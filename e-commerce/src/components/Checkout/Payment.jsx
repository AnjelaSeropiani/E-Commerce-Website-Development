import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { convertAndFormatPrice } from '../../utils/currency';
import '../../styles/Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const { cart, shippingInfo, selectedCurrency, shippingMethod } = useShop();
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        holderName: '',
        expiration: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});

    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Format shipping address
    const formattedAddress = `${shippingInfo?.address}, ${shippingInfo?.postalCode}, ${shippingInfo?.city}, ${shippingInfo?.country}`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        setErrors({});
    };

    const validate = () => {
        const newErrors = {};
        if (paymentMethod === 'Credit Card') {
            if (!paymentDetails.cardNumber.trim()) newErrors.cardNumber = 'Card Number is required';
            if (!paymentDetails.holderName.trim()) newErrors.holderName = 'Holder Name is required';
            if (!paymentDetails.expiration.trim()) newErrors.expiration = 'Expiration date is required';
            if (!paymentDetails.cvv.trim()) newErrors.cvv = 'CVV is required';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // Handle payment submission
        navigate('/checkout/confirmation');
    };

    return (
        <div className="payment-container">
            <div className="payment-content">
                <div className="payment-form-section">
                    {/* Summary Information */}
                    <div className="summary-section">
                        <div className="contact-info">
                            <label>Contact:</label>
                            <span>{shippingInfo?.contact}</span>
                        </div>
                        <div className="address-info">
                            <label>Ship to:</label>
                            <span>{formattedAddress}</span>
                        </div>
                        <div className="method-info">
                            <label>Method:</label>
                            <span>{shippingMethod ? `${shippingMethod.name} - ${shippingMethod.price === 0 ? 'FREE' : convertAndFormatPrice(shippingMethod.price, selectedCurrency)}` : 'Standard Shipping - FREE'}</span>
                        </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="payment-method-section">
                        <h2>Payment method</h2>
                        <div className="payment-options">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Credit Card"
                                    checked={paymentMethod === 'Credit Card'}
                                    onChange={handlePaymentMethodChange}
                                />
                                Credit Card
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={handlePaymentMethodChange}
                                />
                                PayPal
                            </label>
                        </div>

                        {paymentMethod === 'Credit Card' && (
                            <div className="payment-card-section">
                                <div className="card-header">
                                    <span className="card-icon">💳</span>
                                    <span>Credit Card</span>
                                </div>
                                <div className="card-form">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="Card Number"
                                            value={paymentDetails.cardNumber}
                                            onChange={handleInputChange}
                                        />
                                        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="holderName"
                                            placeholder="Holder Name"
                                            value={paymentDetails.holderName}
                                            onChange={handleInputChange}
                                        />
                                        {errors.holderName && <span className="error">{errors.holderName}</span>}
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group half">
                                            <input
                                                type="text"
                                                name="expiration"
                                                placeholder="Expiration (MM/YY)"
                                                value={paymentDetails.expiration}
                                                onChange={handleInputChange}
                                            />
                                            {errors.expiration && <span className="error">{errors.expiration}</span>}
                                        </div>
                                        <div className="form-group half">
                                            <input
                                                type="text"
                                                name="cvv"
                                                placeholder="CVV"
                                                value={paymentDetails.cvv}
                                                onChange={handleInputChange}
                                            />
                                            {errors.cvv && <span className="error">{errors.cvv}</span>}
                                            <span className="cvv-info">ℹ️</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        <Link to="/checkout/shipping-method" className="back-button">Back to shipping</Link>
                        <button onClick={handleSubmit} className="pay-button">Pay now</button>
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
                            <span>{shippingMethod ? (shippingMethod.price === 0 ? 'Free Shipping' : convertAndFormatPrice(shippingMethod.price, selectedCurrency)) : 'Free Shipping'}</span>
                        </div>
                        <div className="total">
                            <span>Total</span>
                            <span>{convertAndFormatPrice(subtotal + (shippingMethod ? shippingMethod.price : 0), selectedCurrency)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
