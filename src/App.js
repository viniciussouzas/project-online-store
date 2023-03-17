import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Categories from './components/Categories';
import Home from './Pages/Home';

class App extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Home } />

        </Switch>
        <Categories />
      </main>
    );
  }
}

export default App;
