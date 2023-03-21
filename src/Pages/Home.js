import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      productList: [],
      redirect: false,
      emptyProductList: false,
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  // Após o click seta o estado para true, if redirect === true, redireciona para /cart
  onClickButton = () => {
    this.setState({
      redirect: true,
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
    const { productList, redirect, emptyProductList } = this.state;
    // Verifica se a lista esta vazia!
    const listEmpty = productList.length === 0;
    // Verifica se redirect é true
    const isRedirect = redirect === true;

    // Redireciona
    if (isRedirect) return <Redirect to="/cart" />;

    // Map do estado productList, que renderiza a lista de produtos pesquisados
    const mappedProductList = productList.map((product) => (
      <ProductCard
        key={ product.id }
        thumbnail={ product.thumbnail }
        title={ product.title }
        price={ product.price }
        id={ product.id }
        shipping={ product.shipping }
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
          onClick={ this.onClickButton }
        >
          Carrinho de Compras
        </button>

        <Categories />
      </div>
    );
  }
}

export default Home;
