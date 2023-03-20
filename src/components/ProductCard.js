import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  addToCart = () => {
    const { title, price, thumbnail, id } = this.props;
    const product = { title, price, thumbnail, id, quantity: 1 };

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    const existingProduct = storedProducts.find((p) => p.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedProducts.push(product);
    }

    localStorage.setItem('products', JSON.stringify(storedProducts));
  };

  render() {
    const { title, price, thumbnail, id } = this.props;

    return (
      <div data-testid="product">
        <Link to={ `/productDetails/${id}` } data-testid="product-detail-link">
          <img src={ thumbnail } alt={ title } />
          <p>{title}</p>
          <p>{price}</p>
        </Link>

        <p>{title}</p>
        <p>{price}</p>
        <button
          onClick={ this.addToCart }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>

      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductCard;
