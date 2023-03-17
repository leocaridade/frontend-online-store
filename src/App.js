import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';

function App() {
  return (
    <>
      <div className="App" />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
      </Switch>
    </>
  );
}

export default App;
