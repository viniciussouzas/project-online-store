import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductLocalStorage } from '../services/local';

class ProductCard extends Component {
  constructor() {
    super();

    this.state = {
      freeShipping: false,
    };
  }

  componentDidMount() {
    const { shipping } = this.props;
    if (shipping !== undefined) {
      this.setState({ freeShipping: shipping.free_shipping });
    }
  }

  addToCart = () => {
    const { title, price, thumbnail, id, updateQuant, availableQuantity } = this.props;
    const product = { title, price, thumbnail, id, quantity: 1, availableQuantity };
    console.log(product);

    const storedProducts = getProductLocalStorage();

    const existingProduct = storedProducts
      .find((p) => p.id === id && p.quantity < p.availableQuantity);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else if (existingProduct !== undefined) {
      storedProducts.push(product);
    } else {
      storedProducts.push(product);
    }

    localStorage.setItem('products', JSON.stringify(storedProducts));

    updateQuant();
  };

  render() {
    const { title, price, thumbnail, id } = this.props;
    const { freeShipping } = this.state;

    return (
      <div data-testid="product">
        <Link to={ `/productDetails/${id}` } data-testid="product-detail-link">
          { freeShipping ? <span data-testid="free-shipping">Frete grátis</span> : <p /> }
          <img src={ thumbnail } alt={ title } />
          <p>{title}</p>
          <p>{price}</p>
        </Link>

        <button
          onClick={ this.addToCart }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>

      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  updateQuant: PropTypes.func.isRequired,
  shipping: PropTypes.shape({
    free_shipping: PropTypes.bool.isRequired,
  }).isRequired,
  availableQuantity: PropTypes.number,
};

ProductCard.defaultProps = {
  availableQuantity: 1,
};

export default ProductCard;
