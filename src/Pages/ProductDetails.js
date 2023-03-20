import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import { setProductLocalStorage } from '../services/local';

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

  render() {
    const { productDetails } = this.state;
    const {
      title,
      thumbnail,
      price,
    } = productDetails;

    return (
      <div>
        <div>
          <button
            data-testid="shopping-cart-button"
            onClick={ this.redirectToCart }
          >
            Carrinho
          </button>
        </div>
        <div>
          <img alt={ title } src={ thumbnail } data-testid="product-detail-image" />
        </div>
        <div>
          <h1 data-testid="product-detail-name">{ title }</h1>
          <p data-testid="product-detail-price">{price}</p>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => setProductLocalStorage(productDetails) }
          >
            Adcionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
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
