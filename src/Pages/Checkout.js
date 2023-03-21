import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductLocalStorage } from '../services/local';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      cartProducts: [],
      name: '',
      email: '',
      CPF: '',
      phone: '',
      CEP: '',
      address: '',
      inputRadio: '',
      isFormValid: true,
    };
  }

  componentDidMount() {
    const cartProducts = getProductLocalStorage();
    this.setState({ cartProducts });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  verifications = () => {
    const { name, email, CEP, CPF, address, phone, inputRadio } = this.state;
    const { history } = this.props;
    const arrayVerify = [name, email, CPF, CEP, address, phone, inputRadio];
    const isValid = arrayVerify.every((item) => item.length !== 0);
    this.setState({
      isFormValid: isValid,
    });
    if (isValid) {
      localStorage.clear();
      history.push('/');
    }
  };

  render() {
    const { name, email, CEP, CPF, address, phone, isFormValid } = this.state;
    const { cartProducts } = this.state;
    const mappedCartProducts = cartProducts.map((product) => (
      <div key={ product.id }>
        <img src={ product.thumbnail } alt={ product.title } />
        <h3>{product.title}</h3>
        <p>{ product.price }</p>
      </div>
    ));

    return (
      <div>
        <div>
          <h2>Resumo dos Produtos.</h2>
          {mappedCartProducts}
        </div>
        <div>
          <fieldset>
            <legend>Informações para Cobrança</legend>
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo."
              data-testid="checkout-fullname"
              onChange={ this.handleChange }
              value={ name }
            />
            <input
              type="email"
              name="email"
              placeholder="Informe Seu E-mail."
              data-testid="checkout-email"
              onChange={ this.handleChange }
              value={ email }
            />
            <input
              type="text"
              name="CPF"
              placeholder="Informe seu CPF."
              data-testid="checkout-cpf"
              onChange={ this.handleChange }
              value={ CPF }
            />
            <input
              type="text"
              name="phone"
              placeholder="Telefone."
              data-testid="checkout-phone"
              onChange={ this.handleChange }
              value={ phone }
            />
            <input
              type="text"
              name="CEP"
              placeholder="CEP."
              data-testid="checkout-cep"
              onChange={ this.handleChange }
              value={ CEP }
            />
            <input
              type="text"
              name="address"
              placeholder="Endreço 1."
              data-testid="checkout-address"
              onChange={ this.handleChange }
              value={ address }
            />
            <label>
              Boleto
              <input
                name="inputRadio"
                value="Boleto"
                type="radio"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
              />
            </label>
            <label>
              Visa
              <input
                name="inputRadio"
                value="Visa"
                type="radio"
                data-testid="visa-payment"
                onChange={ this.handleChange }
              />
            </label>
            <label>
              MasterCard
              <input
                name="inputRadio"
                value="MasterCard"
                type="radio"
                data-testid="master-payment"
                onChange={ this.handleChange }
              />
            </label>
            <label>
              Elo
              <input
                name="inputRadio"
                value="Elo"
                type="radio"
                data-testid="elo-payment"
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="checkout-btn"
              type="submit"
              onClick={ this.verifications }
            >
              Finalizar a Compra
            </button>
            {isFormValid ? <p /> : <p data-testid="error-msg">Campos inválidos</p>}

          </fieldset>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
