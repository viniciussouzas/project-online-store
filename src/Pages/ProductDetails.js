import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import { getProductLocalStorage } from '../services/local';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productDetails: '',
      inputEmail: '',
      inputEvaluation: '',
      inputRadio: undefined,
      verifyForm: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getProductById(id);
    console.log(data);
    this.setState({ productDetails: data });
  }

  redirectToCart = () => {
    const { history } = this.props;
    return history.push('/cart');
  };

  addToCart = () => {
    const { productDetails } = this.state;
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
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  verifications = () => {
    const { inputEmail, inputRadio, inputEvaluation, productDetails } = this.state;

    const localEvaluations = JSON.parse(localStorage.getItem(productDetails.id)) || [];

    if (inputEmail.length === 0
      || inputRadio === undefined
      || !inputEmail.includes('@')) {
      this.setState({
        verifyForm: true,
      });
    } else {
      this.setState({
        verifyForm: false,
        inputEmail: '',
        inputEvaluation: '',
        inputRadio: undefined,
      });
    }

    const productEvaluation = {
      email: inputEmail,
      text: inputEvaluation,
      rating: inputRadio,
    };

    localEvaluations.push(productEvaluation);

    localStorage.setItem(productDetails.id, JSON.stringify(localEvaluations));
  };

  render() {
    const {
      productDetails,
      inputEmail,
      inputEvaluation,
      verifyForm,
    } = this.state;
    const {
      title,
      thumbnail,
      price,
    } = productDetails;

    const rate1 = 1;
    const rate2 = 2;
    const rate3 = 3;
    const rate4 = 4;
    const rate5 = 5;

    const localEvaluations = JSON.parse(localStorage.getItem(productDetails.id)) || [];

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
          <p
            data-testid="product-detail-price"
          >
            {price}
          </p>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ this.addToCart }
          >
            Adcionar ao Carrinho
          </button>
        </div>

        <fieldset>
          <legend>Avaliações</legend>

          <label>
            <input
              type="radio"
              value="1"
              data-testid={ `${rate1}-rating` }
              name="inputRadio"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              value="2"
              data-testid={ `${rate2}-rating` }
              name="inputRadio"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              value="3"
              data-testid={ `${rate3}-rating` }
              name="inputRadio"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              value="4"
              data-testid={ `${rate4}-rating` }
              name="inputRadio"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              value="5"
              data-testid={ `${rate5}-rating` }
              name="inputRadio"
              onChange={ this.handleChange }
            />
          </label>

          <div>
            <input
              type="email"
              data-testid="product-detail-email"
              name="inputEmail"
              onChange={ this.handleChange }
              value={ inputEmail }
              placeholder="Email"
            />
          </div>

          <label>
            <textarea
              type="text"
              data-testid="product-detail-evaluation"
              name="inputEvaluation"
              onChange={ this.handleChange }
              value={ inputEvaluation }
              placeholder="Avaliação"
            />
          </label>

          <div>
            <button
              data-testid="submit-review-btn"
              onClick={ this.verifications }
              type="submit"
            >
              Adicionar avaliação
            </button>
          </div>
        </fieldset>

        <div>
          { verifyForm && <p data-testid="error-msg">Campos inválidos</p> }
        </div>

        <div>
          { localEvaluations.map((evaluation) => (
            <div key={ evaluation.text }>
              <p data-testid="review-card-email">{ evaluation.email }</p>
              <p data-testid="review-card-rating">{ evaluation.rating }</p>
              <p data-testid="review-card-evaluation">{ evaluation.text }</p>
            </div>
          )) }
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
