import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <>
      <div className="App" />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route exact path="/product-details/:id" component={ ProductDetails } />
      </Switch>
    </>
  );
}

export default App;
