import React, { Component } from 'react';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
    };
  }

  render() {
    const { cart } = this.state;
    // Verifica se o carrinho está vazio, se sim renderiza mensagem
    const cartEmpty = cart.length === 0;

    return (
      <div>
        { cartEmpty
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cart }
      </div>
    );
  }
}

export default ShoppingCart;
