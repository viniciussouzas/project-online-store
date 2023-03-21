import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProductDetails from './Pages/ProductDetails';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import Checkout from './Pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ ShoppingCart } />
          <Route
            exact
            path="/productDetails/:id"
            render={ (props) => (<ProductDetails
              { ...props }
            />) }
          />
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </main>
    );
  }
}

export default App;
