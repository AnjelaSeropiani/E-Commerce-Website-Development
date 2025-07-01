import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { convertAndFormatPrice } from '../../utils/currency';
import '../../styles/ShippingInfo.css';

const ShippingInfo = () => {
    const navigate = useNavigate();
    const { cart, setShippingInfo, selectedCurrency } = useShop();

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const [formData, setFormData] = useState({
        contact: '',
        firstName: '',
        lastName: '',
        address: '',
        shippingNote: '',
        city: '',
        postalCode: '',
        country: '',
        saveInfo: false
    });

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^\d{9}$/;
        return re.test(phone);
    };

    const validatePostalCode = (code) => {
        // This regex allows for common postal code formats
        const re = /^[A-Z0-9]{3,10}$/i;
        return re.test(code.trim());
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'contact':
                if (!value) {
                    error = 'Contact information is required';
                } else if (!validateEmail(value) && !validatePhone(value)) {
                    error = 'Please enter a valid email or a 9-digit phone number';
                }
                break;
            case 'firstName':
            case 'lastName':
                if (!value.trim()) {
                    error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
                } else if (!/^[A-Za-z\s-]{2,}$/.test(value)) {
                    error = 'Please enter a valid name (letters, spaces, and hyphens only)';
                }
                break;
            case 'address':
                if (!value.trim()) {
                    error = 'Address is required';
                } else if (value.trim().length < 5) {
                    error = 'Please enter a complete address';
                }
                break;
            case 'city':
                if (!value.trim()) {
                    error = 'City is required';
                } else if (!/^[A-Za-z\s-]{2,}$/.test(value)) {
                    error = 'Please enter a valid city name';
                }
                break;
            case 'postalCode':
                if (!value.trim()) {
                    error = 'Postal code is required';
                } else if (!validatePostalCode(value)) {
                    error = 'Please enter a valid postal code';
                }
                break;
            case 'country':
                if (!value) {
                    error = 'Country is required';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Validate the field if it's not a checkbox
        if (type !== 'checkbox') {
            const error = validateField(name, newValue);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'shippingNote' && key !== 'saveInfo') { // Skip optional fields
                const error = validateField(key, formData[key]);
                if (error) {
                    newErrors[key] = error;
                }
            }
        });

        setErrors(newErrors);

        // If no errors, proceed
        if (Object.keys(newErrors).length === 0) {
            setShippingInfo(formData);
            navigate('/checkout/shipping-method');
        }
    };

    return (
        <div className="shipping-info-container">
            <div className="shipping-content">
                <div className="shipping-form-section">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-section">
                            <h3>Contact</h3>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="Email or mobile phone number"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className={errors.contact ? 'error' : ''}
                                />
                                {errors.contact && <div className="error-message">{errors.contact}</div>}
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Shipping Address</h3>
                            <div className="name-inputs">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={errors.firstName ? 'error' : ''}
                                    />
                                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Second Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={errors.lastName ? 'error' : ''}
                                    />
                                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                                </div>
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address and number"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={errors.address ? 'error' : ''}
                                />
                                {errors.address && <div className="error-message">{errors.address}</div>}
                            </div>
                            <input
                                type="text"
                                name="shippingNote"
                                placeholder="Shipping note (optional)"
                                value={formData.shippingNote}
                                onChange={handleChange}
                            />
                            <div className="location-inputs">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={errors.city ? 'error' : ''}
                                    />
                                    {errors.city && <div className="error-message">{errors.city}</div>}
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder="Postal Code"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className={errors.postalCode ? 'error' : ''}
                                    />
                                    {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
                                </div>
                            </div>
                            <div className="input-group">
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={`country-select ${errors.country ? 'error' : ''}`}
                                >
                                    <option value="">Select Country</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Italy">Italy</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Spain">Spain</option>
                                </select>
                                {errors.country && <div className="error-message">{errors.country}</div>}
                            </div>
                            <div className="save-info">
                                <input
                                    type="checkbox"
                                    id="saveInfo"
                                    name="saveInfo"
                                    checked={formData.saveInfo}
                                    onChange={handleChange}
                                />
                                <label htmlFor="saveInfo">
                                    Save this informations for a future fast checkout
                                </label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <Link to="/cart" className="back-button">Back to cart</Link>
                            <button type="submit" className="next-button">Go to shipping</button>
                        </div>
                    </form>
                </div>

                <div className="order-summary">
                    {cart.length > 0 ? (
                        <>
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                        {item.quantity > 1 && (
                                            <span className="item-count">{item.quantity}</span>
                                        )}
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
                                    <span>Calculated at the next step</span>
                                </div>
                                <div className="total">
                                    <span>Total</span>
                                    <span>{convertAndFormatPrice(subtotal, selectedCurrency)}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="empty-cart-message">
                            <p>Your cart is empty</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;
