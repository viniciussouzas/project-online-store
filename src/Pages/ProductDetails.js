import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import { getProductLocalStorage } from '../services/local';
import CartIcon from '../components/CartIcon';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productDetails: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getProductById(id);
    this.setState({ productDetails: data });
  }

  redirectToCart = () => {
    const { history } = this.props;
    return history.push('/cart');
  };

  addToCart = () => {
    const { productDetails } = this.state;
    const { updateQuant } = this.props;
    const {
      title,
      thumbnail,
      price,
      id,
    } = productDetails;
    const product = { title, price, thumbnail, id, quantity: 1 };
    const storedProducts = getProductLocalStorage();

    const existingProduct = storedProducts.find((p) => p.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedProducts.push(product);
    }

    localStorage.setItem('products', JSON.stringify(storedProducts));

    updateQuant();
  };

  render() {
    const { productDetails } = this.state;
    const {
      title,
      thumbnail,
      price,
    } = productDetails;

    const { productQuant } = this.props;

    return (
      <div>
        <div>
          <button
            data-testid="shopping-cart-button"
            onClick={ this.redirectToCart }
          >
            Carrinho de Compras
          </button>
          <CartIcon productQuant={ productQuant } />
        </div>
        <div>
          <img alt={ title } src={ thumbnail } data-testid="product-detail-image" />
        </div>
        <div>
          <h1 data-testid="product-detail-name">{ title }</h1>
          <p data-testid="product-detail-price">{price}</p>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ this.addToCart }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  updateQuant: PropTypes.func.isRequired,
  productQuant: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
