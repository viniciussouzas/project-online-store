import React, { Component } from 'react';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CartIcon from '../components/CartIcon';
import { getTotalProductQuantity } from '../services/local';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      productList: [],
      emptyProductList: false,
      productQuantity: getTotalProductQuantity(),
    };
  }

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
    const { productList, emptyProductList, productQuantity } = this.state;
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

        <CartIcon productQuantity={ productQuantity } data-testid="shopping-cart-size" />

        <Categories />
      </div>
    );
  }
}

export default Home;
