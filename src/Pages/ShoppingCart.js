import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductLocalStorage } from '../services/local';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      cart: getProductLocalStorage(),
    };
  }

  handleDecrement = ({ target }) => {
    const { cart } = this.state;
    const { updateQuant } = this.props;

    const { id } = target;

    // Condicional que pega o id do item clicado e compara com o que está no estado, se igual, decrementa a propriedade quantity do item clicado, na tela e no localStorage

    const newCart = cart.map((item) => {
      if (id === item.id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }

      return item;
    });

    this.setState({
      cart: newCart,
    }, localStorage.setItem('products', JSON.stringify(newCart)));

    updateQuant();
  };

  handleIncrement = ({ target }) => {
    const { cart } = this.state;
    const { updateQuant } = this.props;

    const { id } = target;

    // Condicional que pega o id do item clicado e compara com o que está no estado, se igual, incrementa a propriedade quantity do item clicado, na tela e no localStorage

    const newCart = cart.map((item) => {
      if (id === item.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    this.setState({
      cart: newCart,
    }, localStorage.setItem('products', JSON.stringify(newCart)));

    updateQuant();
  };

  handleRemove = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;
    const { updateQuant } = this.props;

    // Condicional que verifica se o id do item clicado é diferente do que está no estado, se true, remove apenas o item clicado

    const newCart = cart.filter((item) => id !== item.id);

    this.setState({
      cart: newCart,
    }, localStorage.setItem('products', JSON.stringify(newCart)));

    updateQuant();
  };

  redirect = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  render() {
    const { cart } = this.state;

    const cartEmpty = cart.length === 0;
    const mappedCart = cart.map((item) => (
      <div key={ item.id }>
        <img src={ item.thumbnail } alt={ item.title } />
        <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
        <button
          id={ item.id }
          type="button"
          data-testid="remove-product"
          onClick={ this.handleRemove }
        >
          Remover
        </button>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {`Quantidade: ${item.quantity}`}
        </p>
        <button
          id={ item.id }
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.handleDecrement }
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
          : mappedCart}
        <div>
          <button
            data-testid="checkout-products"
            onClick={ this.redirect }
          >
            Finalizar Compra!
          </button>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  updateQuant: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ShoppingCart;
