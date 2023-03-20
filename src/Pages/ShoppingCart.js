import React, { Component } from 'react';
import { getProductLocalStorage } from '../services/local';

class ShoppingCart extends Component {
  constructor() {
    super();

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
    return (
      <div>
        { cartEmpty
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : mappedProductList }
      </div>
    );
  }
}

export default ShoppingCart;
