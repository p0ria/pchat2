import React from 'react';
import './App.scss';
import LoginPage from './Pages/Login/LoginPage';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import { useDispatch } from 'react-redux';
import { loadToken } from './state/login/login.actions';

function App() {
  const dispatch = useDispatch();
  dispatch(loadToken());
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
