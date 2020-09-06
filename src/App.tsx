import React from 'react';
import './App.scss';
import LoginPage from './Pages/Login/LoginPage';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
