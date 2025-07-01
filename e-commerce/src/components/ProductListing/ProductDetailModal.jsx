import React, { useState } from 'react';
import '../../styles/ProductDetailModal.css';

const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [mainImage, setMainImage] = useState(product.image || (product.images && product.images[0]));

    if (!product) return null;

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCartClick = () => {
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            alert('Please select a size before adding to cart.');
            return;
        }
        onAddToCart({
            ...product,
            size: selectedSize,
            quantity: 1,
            image: mainImage,
        });
        onClose();
    };

    return (
        <div className="product-detail-modal-overlay" onClick={onClose}>
            <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
                <div className="product-detail-images">
                    <div className="thumbnails">
                        {(product.images || [product.image]).map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${product.name} thumbnail ${idx + 1}`}
                                className={`thumbnail ${img === mainImage ? 'selected' : ''}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                    <div className="main-image-container">
                        <img src={mainImage} alt={product.name} className="main-image" />
                    </div>
                </div>
                <div className="product-detail-info">
                    <h2>{product.name}</h2>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <div className="size-selector">
                        <span>SIZE:</span>
                        <div className="sizes">
                            {product.sizes && product.sizes.length > 0 ? (
                                product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => handleSizeSelect(size)}
                                    >
                                        {size}
                                    </button>
                                ))
                            ) : (
                                <span>No sizes available</span>
                            )}
                        </div>
                    </div>
                    <button
                        className="add-to-cart-button2"
                        onClick={handleAddToCartClick}
                        disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
                    >
                        ADD TO CART
                    </button>
                    <p className="product-description">{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
