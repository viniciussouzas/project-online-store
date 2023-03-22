import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProductDetails from './Pages/ProductDetails';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      productQuant: 0,
    };
  }

  componentDidMount() {
    this.updateQuant();
  }

  updateQuant = () => {
    const productsList = JSON.parse(localStorage.getItem('products'));

    const newQuantity = productsList?.reduce((acc, curr) => acc + curr.quantity, 0);

    this.setState({
      productQuant: newQuantity,
    });

    localStorage.setItem('productQuantity', newQuantity);
  };

  render() {
    const { productQuant } = this.state;
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              productQuant={ productQuant }
              updateQuant={ this.updateQuant }
            />) }
          />
          <Route
            exact
            path="/cart"
            render={ (props) => (<ShoppingCart
              { ...props }
              updateQuant={ this.updateQuant }
            />) }
          />
          <Route
            exact
            path="/productDetails/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              productQuant={ productQuant }
              updateQuant={ this.updateQuant }
            />) }
          />
        </Switch>
      </main>
    );
  }
}

export default App;
