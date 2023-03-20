import React, { Component } from 'react';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('products'));

    this.setState({
      cart: cartItems,
    });
  }

  render() {
    const { cart } = this.state;
    // Verifica se o carrinho está vazio, se sim renderiza mensagem

    const cartEmpty = cart.length === 0;

    return (
      <div>
        { cartEmpty
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : mappedCart }
      </div>
    );
  }
}

export default ShoppingCart;
