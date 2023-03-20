import React, { Component } from 'react';

class ShoppingCart extends Component {
  constructor() {
    super();

    const cartItems = JSON.parse(localStorage.getItem('products')) || [];
    console.log(cartItems);
    this.state = {
      cart: cartItems,
    };
  }

  render() {
    const { cart } = this.state;
    // Verifica se o carrinho está vazio, se sim renderiza mensagem

    const cartEmpty = cart.length === 0;

    const mappedCart = cart.map((item) => (
      <div key={ item.id }>
        <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {`Quantidade: ${item.quantity}`}
        </p>
        <p>{`Preço: ${item.price}`}</p>
        <p />
      </div>
    ));
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
