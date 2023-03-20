import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  addToCart = () => {
    const { title, price, thumbnail, id } = this.props;
    const product = [{ title, price, thumbnail, id }];

    if (localStorage.getItem('products') === null) {
      localStorage.setItem('products', JSON.stringify([product]));
    } else {
      localStorage
        .setItem(
          'products',
          JSON.stringify([...JSON.parse(localStorage.getItem('products')), product]),
        );
    }
  };

  render() {
    const { title, price, thumbnail, id } = this.props;

    return (
      <div data-testid="product">
        <Link to={ `/productDetails/${id}` } data-testid="product-detail-link">
          <img src={ thumbnail } alt={ title } />
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
