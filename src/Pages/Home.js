import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();

    this.onClickButton = this.onClickButton.bind(this);

    this.state = {
      productList: [],
      redirect: false,
    };
  }

  // Após o click seta o estado para true, if redirect === true, redireciona para /cart
  onClickButton = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { productList, redirect } = this.state;
    // Verifica se a lista esta vazia!
    const listEmpty = productList.length === 0;
    // Verifica se redirect é true
    const isRedirect = redirect === true;

    // Redireciona
    if (isRedirect) return <Redirect to="/cart" />;

    return (
      <div>
        <input type="text" placeholder="Faça aqui sua busca" />
        <button>Pesquisar</button>
        {/* Caso a lista esteja vazia, renderiza a mensagem */}
        {listEmpty
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
          : productList }

        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.onClickButton }
        >
          Carrinho de Compras
        </button>
      </div>
    );
  }
}

export default Home;
