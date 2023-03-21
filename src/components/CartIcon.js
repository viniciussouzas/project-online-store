import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartIcon extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };
  }

  onClickButton = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { redirect } = this.state;
    const { productQuantity } = this.props;

    // Verifica se redirect é true
    const isRedirect = redirect === true;

    // Redireciona
    if (isRedirect) return <Redirect to="/cart" />;

    return (
      <button
        type="button"
        data-testid="shopping-cart-button"
        onClick={ this.onClickButton }
      >
        {productQuantity}
      </button>
    );
  }
}

CartIcon.propTypes = {
  productQuantity: PropTypes.number.isRequired,
};

export default CartIcon;
