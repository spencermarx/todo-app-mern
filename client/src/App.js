// ======================================
// Require Packages
// ======================================
import React from 'react';
import AppNavbar from './components/AppNavbar';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from "./components/private-route/PrivateRoute";
import TodoList from './components/TodoList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// ======================================
// Require CSS
// ======================================
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// ======================================
// Check Authentication JWT Token
// ======================================
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

// ======================================
// Define Component
// ======================================
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <AppNavbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Switch>
              <PrivateRoute exact path="/todos" component={TodoList} />
            </Switch>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

// ======================================
// Export Component
// ======================================
export default App;
