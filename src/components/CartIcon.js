import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
    const {
      redirect,
    } = this.state;

    // Verifica se redirect é true
    const isRedirect = redirect === true;

    // Redireciona
    if (isRedirect) return <Redirect to="/cart" />;

    const products = JSON.parse(localStorage.getItem('products'));

    const productQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0);
    const currProducts = JSON.parse(localStorage.getItem('productQuantity'));
    localStorage.setItem('productQuantity', JSON.stringify(productQuantity));

    console.log(productQuantity);
    console.log(currProducts);

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

export default CartIcon;
