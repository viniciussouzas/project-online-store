import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CartIcon from '../components/CartIcon';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      productList: [],
      emptyProductList: false,
    };
  }

  redirectToCart = () => {
    const { history } = this.props;
    return history.push('/cart');
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleFetchSearch = async () => {
    const { queryButton } = this.state;
    // Se input estiver vazio, atualiza estado para mostrar a mensagem
    if (!queryButton) {
      this.setState({
        emptyProductList: true,
      });
      return;
    }

    const { results } = await getProductsFromCategoryAndQuery('', queryButton);

    if (results.length === 0) {
      this.setState({
        emptyProductList: true,
      });
    } else {
      this.setState({
        emptyProductList: false,
        productList: results,
      });
    }
  };

  render() {
    const { productList, emptyProductList } = this.state;
    const { productQuant, updateQuant } = this.props;
    // Verifica se a lista esta vazia!
    const listEmpty = productList.length === 0;

    // Map do estado productList, que renderiza a lista de produtos pesquisados
    const mappedProductList = productList.map((product) => (
      <ProductCard
        key={ product.id }
        thumbnail={ product.thumbnail }
        title={ product.title }
        price={ product.price }
        id={ product.id }
        updateQuant={ updateQuant }
      />
    ));
    return (
      <div>
        <input
          name="queryButton"
          type="text"
          placeholder="Faça aqui sua busca"
          onChange={ this.onInputChange }
          data-testid="query-input"
        />
        <button
          onClick={ this.handleFetchSearch }
          data-testid="query-button"
        >
          Pesquisar
        </button>
        {
          emptyProductList ? <p>Nenhum produto foi encontrado</p>
            : mappedProductList
        }
        {/* Caso a lista esteja vazia, renderiza a mensagem */}
        {listEmpty
          && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}

        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.redirectToCart }
        >
          Carrinho de Compras
        </button>

        <CartIcon productQuant={ productQuant } />

        <Categories updateQuant={ updateQuant } />
      </div>
    );
  }
}

Home.propTypes = {
  productQuant: PropTypes.number.isRequired,
  updateQuant: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
