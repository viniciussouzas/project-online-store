import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartIcon extends Component {
  render() {
    const { productQuant } = this.props;

    return (
      <p data-testid="shopping-cart-size">{productQuant}</p>
    );
  }
}

CartIcon.propTypes = {
  productQuant: PropTypes.number,
};

CartIcon.defaultProps = {
  productQuant: 0,
};

export default CartIcon;
