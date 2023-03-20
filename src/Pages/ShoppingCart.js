import React, { Component } from 'react';
import { getProductLocalStorage } from '../services/local';

class ShoppingCart extends Component {
  constructor() {
    super();

    const cartItems = JSON.parse(localStorage.getItem('products')) || [];
    console.log(cartItems);
    this.state = {
      cart: getProductLocalStorage(),
    };
  }

  render() {
    const { cart } = this.state;
    // A key utilizada no map é o index pois existe a possibilidade do usuario comprar mais de um produto igual.
    const mappedProductList = cart.map((product, index) => (
      <div key={ index }>
        <img src={ product.thumbnail } alt={ product.title } />
        <h2 data-testid="shopping-cart-product-name">{product.title}</h2>
        <p>{product.price}</p>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {/* Filtra o array do localStorage para identificar quantos produtos do mesmo foram adcionados ao carrinho. */}
          {cart.filter((item) => (item.id === product.id)).length}
        </p>
      </div>
    ));

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
