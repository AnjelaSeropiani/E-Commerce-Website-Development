import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export function useShop() {
    return useContext(ShopContext);
}

export function ShopProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [shippingMethod, setShippingMethod] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [orderSummary, setOrderSummary] = useState(null);

    const addToCart = (product) => {
        setCart(prevCart => {
            console.log('addToCart called with product:', product);
            const existingItemIndex = prevCart.findIndex(item =>
                item.id === product.id &&
                item.size === product.size &&
                item.color === product.color
            );

            if (existingItemIndex !== -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex] = {
                    ...newCart[existingItemIndex],
                    quantity: newCart[existingItemIndex].quantity + 1
                };
                return newCart;
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId, size, color) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item.id === productId && item.size === size && item.color === color)
        ));
    };

    const updateQuantity = (productId, quantity, size, color) => {
        if (quantity < 1) {
            removeFromCart(productId, size, color);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId &&
                    item.size === size &&
                    item.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const increaseQuantity = (productId, size, color) => {
        const item = cart.find(item =>
            item.id === productId &&
            item.size === size &&
            item.color === color
        );
        if (item) {
            updateQuantity(productId, item.quantity + 1, size, color);
        }
    };

    const decreaseQuantity = (productId, size, color) => {
        const item = cart.find(item =>
            item.id === productId &&
            item.size === size &&
            item.color === color
        );
        if (item) {
            updateQuantity(productId, item.quantity - 1, size, color);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateItemSize = (productId, oldSize, oldColor, newSize) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(item =>
                item.id === productId &&
                item.size === oldSize &&
                item.color === oldColor
            );
            if (itemIndex === -1) return prevCart;

            const newCart = [...prevCart];
            newCart[itemIndex] = {
                ...newCart[itemIndex],
                size: newSize
            };
            return newCart;
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const saveOrderSummary = () => {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingCost = shippingMethod ? shippingMethod.price : 0;
        const tax = subtotal * 0.17; // 17% tax rate
        const total = subtotal + shippingCost + tax;
        const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(8, '0');

        setOrderSummary({
            orderNumber,
            subtotal,
            shippingCost,
            tax,
            total,
            items: [...cart],
            shippingMethodName: shippingMethod ? shippingMethod.name : 'Standard Shipping'
        });
    };

    const clearOrderSummary = () => {
        setOrderSummary(null);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        calculateTotal,
        updateItemSize,
        shippingInfo,
        setShippingInfo,
        shippingMethod,
        setShippingMethod,
        paymentInfo,
        setPaymentInfo,
        selectedCurrency,
        setSelectedCurrency,
        orderSummary,
        saveOrderSummary,
        clearOrderSummary
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}
