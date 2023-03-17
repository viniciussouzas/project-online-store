import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    // Aqui fazemos a requisição das categorias e lançamos no state caategories
    const fetchCategories = await getCategories();
    this.setState({ categories: fetchCategories });
  }

  render() {
    const { categories } = this.state;
    // Optamos por fazer o map dentro do render ao invés de dentro do return, retorna uma label que encapsula um p e um input radio
    const mappedCategories = categories.map((categorie) => (
      <label
        data-testid="category"
        htmlFor="categorie-name"
        key={ categorie.id }
      >
        <p
          name="categorie-name"
        >
          { categorie.name }

        </p>
        <input
          type="radio"
        />
      </label>
    ));
    return (
      <div>
        { mappedCategories }
      </div>
    );
  }
}

export default Categories;
