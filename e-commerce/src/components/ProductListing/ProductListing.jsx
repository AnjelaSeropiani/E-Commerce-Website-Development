import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { products } from '../../data/Product';
import '../../styles/ProductListing.css';
import ProductDetailModal from './ProductDetailModal';

const ProductListing = () => {
  const { category } = useParams();
  const { selectedCurrency, addToCart } = useShop();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  // Filter products by category if one is selected
  const filteredProducts = category
    ? products.filter(product => product.category.toLowerCase() === category.toLowerCase())
    : products;

  // Capitalize first letter of category name
  const displayCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'All Products';

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    // Always open modal to select size before adding to cart
    openModal(product);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleAddToCartFromModal = (productWithSize) => {
    addToCart({ ...productWithSize, category: productWithSize.category });
  };

  return (
    <div className="product-listing">
      <h1 className="category-name">{displayCategory}</h1>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`product-card ${product.isOutOfStock ? 'out-of-stock' : ''}`}
            onClick={() => {
              if (!product.isOutOfStock) {
                openModal(product);
              }
            }}
          >
            <div className="product-image-container">
              <img
                src={product.image || (product.images && product.images[0])}
                alt={product.name}
                className="product-image"
              />
              {/* Removed add to cart button from product listing */}
              {!product.isOutOfStock && (
                <button
                  className="add-to-cart-button1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(e, product);
                  }}
                  aria-label="Add to cart"
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33693 19.5613 4.87359Z" fill="white" />
                    <path d="M8.44437 14.9814C7.2443 14.9814 6.25488 15.9276 6.25488 17.0751C6.25488 18.2226 7.24439 19.1688 8.44437 19.1688C9.64445 19.1696 10.6339 18.2234 10.6339 17.0757C10.6339 15.928 9.64436 14.9814 8.44437 14.9814Z" fill="white" />
                    <path d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9276 13.498 17.0751C13.498 18.2226 14.4876 19.1688 15.6875 19.1688C16.8875 19.1696 17.877 18.2234 17.877 17.0757C17.877 15.928 16.8875 14.9814 15.6875 14.9814Z" fill="white" />
                  </svg>
                </button>
              )}
              {product.isOutOfStock && (
                <div className="out-of-stock-overlay">
                  OUT OF STOCK
                </div>
              )}
            </div>

            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-price">{formatPrice(product.price)}</div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeModal}
          onAddToCart={handleAddToCartFromModal}
        />
      )}
    </div>
  );
};

export default ProductListing;
