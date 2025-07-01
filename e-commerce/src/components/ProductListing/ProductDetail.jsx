import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { products } from '../../data/Product';
import '../../styles/ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart, selectedCurrency } = useShop();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Find the product from our data
  const product = products.find(p => p.id === parseInt(productId));

  useEffect(() => {
    // Reset selected attributes when product changes
    setSelectedAttributes({});
    // Reset selected image when product changes
    setSelectedImage(0);
  }, [product]);

  if (!product) {
    return <div className="product-detail">Product not found</div>;
  }

  const handleAttributeSelect = (name, value) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const allAttributesSelected = () => {
    return product.attributes ?
      product.attributes.every(attr => selectedAttributes[attr.name]) :
      true;
  };

  const handleAddToCart = () => {
    if (allAttributesSelected()) {
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images ? product.images[0] : product.image,
        category: product.category,
        ...selectedAttributes,
        quantity: 1
      });
    }
  };

  const formatPrice = (price) => {
    const currencies = {
      USD: { symbol: '$', rate: 1 },
      EUR: { symbol: '€', rate: 0.92 },
      JPY: { symbol: '¥', rate: 148.50 }
    };

    const { symbol, rate } = currencies[selectedCurrency];
    return `${symbol}${(price * rate).toFixed(selectedCurrency === 'JPY' ? 0 : 2)}`;
  };

  const images = product.images || [product.image];

  return (
    <div className="product-detail">
      <div className="product-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} view ${index + 1}`}
            className="thumbnail"
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>

      <div className="main-image-container">
        <img
          src={images[selectedImage]}
          alt={product.name}
          className="main-image"
        />
      </div>

      <div className="product-info">
        <h1 className="product-brand">{product.brand}</h1>
        <h2 className="product-name">{product.name}</h2>

        {product.attributes && product.attributes.map((attribute) => (
          <div key={attribute.name} className="attribute-section">
            <div className="attribute-name">{attribute.name}:</div>
            <div className="attribute-options">
              {attribute.options.map((option) => (
                attribute.name.toLowerCase() === 'color' ? (
                  <div
                    key={option}
                    className={`color-option ${selectedAttributes[attribute.name] === option ? 'selected' : ''}`}
                    style={{ backgroundColor: option }}
                    onClick={() => handleAttributeSelect(attribute.name, option)}
                  />
                ) : (
                  <button
                    key={option}
                    className={`attribute-button ${selectedAttributes[attribute.name] === option ? 'selected' : ''}`}
                    onClick={() => handleAttributeSelect(attribute.name, option)}
                  >
                    {option}
                  </button>
                )
              ))}
            </div>
          </div>
        ))}

        <div className="price-section">
          <div className="price-label">Price:</div>
          <div className="price-amount">{formatPrice(product.price)}</div>
        </div>

        <button
          id={`add-to-cart-button1-${product.id}`}
          className="add-to-cart-button1"
          disabled={!allAttributesSelected() || product.isOutOfStock}
          onClick={handleAddToCart}
        >
          {product.isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
        </button>

        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
