import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { title, price, thumbnail } = this.props;

    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <p>{title}</p>
        <p>{price}</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ProductCard;
