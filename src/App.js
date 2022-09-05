import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { loadAnimation } from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import 'react-tippy/dist/tippy.css';

defineLordIconElement(loadAnimation);

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </Switch>
  );
}
//
export default App;
