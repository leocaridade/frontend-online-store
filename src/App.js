import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <>
    <div className="App" />
    <Switch>
      <Route exact path="/" component={ Home }></Route>
    </Switch>
    </>
  );
}

export default App;
