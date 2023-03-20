import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

class Categories extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      categoryList: [],
    };
  }

  async componentDidMount() {
    // Aqui fazemos a requisição das categorias e lançamos no state caategories
    const fetchCategories = await getCategories();
    this.setState({ categories: fetchCategories });
  }

  handleRenderCategories = async ({ target }) => {
    // Pega o id da categoria clicada e realiza fetch na função

    const { id } = target;
    const { results } = await getProductsFromCategoryAndQuery(id, '');

    this.setState({
      categoryList: results,
    });
  };

  render() {
    const { categories, categoryList } = this.state;
    // Optamos por fazer o map dentro do render ao invés de dentro do return, retorna uma label que encapsula um p e um input radio
    const mappedCategories = categories.map((categorie) => (
      <label
        data-testid="category"
        htmlFor={ categorie.id }
        key={ categorie.id }
      >
        <p
          name={ categorie.id }
        >
          { categorie.name }

        </p>
        <input
          name="category"
          id={ categorie.id }
          type="radio"
          onChange={ this.handleRenderCategories }
        />
      </label>
    ));

    const mappedList = categoryList.map((category) => (
      // Renderiza lista da categoria selecionada
      <ProductCard
        key={ category.id }
        title={ category.title }
        price={ category.price }
        thumbnail={ category.thumbnail }
        data-testid="product"
      />));

    return (
      <div>
        { mappedCategories }
        {mappedList}
      </div>
    );
  }
}

export default Categories;
