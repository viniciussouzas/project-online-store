import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProductDetails from './components/ProductCard';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';

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
        </Switch>
      </main>
    );
  }
}

export default App;
