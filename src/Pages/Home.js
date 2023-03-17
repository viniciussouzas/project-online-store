import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      productList: [],
    };
  }

  render() {
    const { productList } = this.state;
    // Verifica se a lista esta vazia!
    const listEmpty = productList.length === 0;

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
      </div>
    );
  }
}

export default Home;
