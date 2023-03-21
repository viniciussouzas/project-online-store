import React, { Component } from 'react';
import { getProductLocalStorage } from '../services/local';

class ShoppingCart extends Component {
  constructor() {
    super();

    // const cartItems = JSON.parse(localStorage.getItem('products')) || [];

    this.state = {
      cart: getProductLocalStorage(),
    };
  }

  handleIncrement = ({ target }) => {
    const { cart } = this.state;

    const { id } = target;

    const newCart = cart.map((item) => {
      if (id === item.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    this.setState({
      cart: newCart,
    });

    localStorage.setItem('products', JSON.stringify(cart));

    console.log(cart);
  };

  render() {
    const { cart } = this.state;

    const cartEmpty = cart.length === 0;
    const mappedCart = cart.map((item) => (
      <div key={ item.id }>
        <img src={ item.thumbnail } alt={ item.title } />
        <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
        <button
          type="button"
          data-testid="remove-product"
          // onClick={}
        >
          Remover
        </button>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {`Quantidade: ${item.quantity}`}
        </p>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          // onClick={}
        >
          -
        </button>
        <button
          id={ item.id }
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.handleIncrement }
        >
          +
        </button>
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
