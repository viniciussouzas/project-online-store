import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getProductLocalStorage } from '../services/local';

class CartIcon extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      products: getProductLocalStorage(),
      productQuant: 0,
    };
  }

  componentDidMount() {
    this.handleCartIcon();
  }

  onClickButton = () => {
    this.setState({
      redirect: true,
    });
  };

  handleCartIcon = () => {
    const { products } = this.state;

    const productQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0);

    this.setState({
      productQuant: productQuantity,

    }, () => {
      const teste = JSON.parse(localStorage.getItem('productQuantity'));

      localStorage.setItem('productQuantity', JSON.stringify(teste + productQuantity));
    });
  };

  render() {
    const {
      redirect,
      productQuant,
    } = this.state;

    // Verifica se redirect é true
    const isRedirect = redirect === true;

    // Redireciona
    if (isRedirect) return <Redirect to="/cart" />;

    // const products = JSON.parse(localStorage.getItem('products'));

    // const productQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0);
    // localStorage.setItem('productQuantity', JSON.stringify(productQuantity));
    // const currProducts = JSON.parse(localStorage.getItem('productQuantity'));

    // console.log(productQuantity);
    // console.log(currProducts);

    return (
      <button
        type="button"
        data-testid="shopping-cart-button"
        onClick={ this.onClickButton }
      >
        {productQuant}

      </button>
    );
  }
}

export default CartIcon;
