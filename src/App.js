import React from 'react';
import AppNavbar from "./components/layout/AppNavbar"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from "./components/layout/Dashboard"
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth'
import './App.css';
import Addclient from './components/clients/AddClient'
import ClientDetails from './components/clients/ClientDetails'
import editClient from './components/clients/EditClient'
import {Provider} from 'react-redux'
import login from "./components/auth/login"
import register from "./components/auth/register"
import store from './store'
import Settings from './components/settings/Settings'

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <AppNavbar/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Dashboard)}>

            </Route>
            <Route exact path="/client/add" component={UserIsAuthenticated(Addclient)}>

            </Route>
            <Route exact path='/client/:id' component={UserIsAuthenticated(ClientDetails)}>

            </Route>
            <Route exact path='/client/edit/:id' component={UserIsAuthenticated(editClient)}>

            </Route>
            <Route exact path='/login' component={UserIsNotAuthenticated(login)}>

            </Route>
            <Route exact path='/register' component={UserIsNotAuthenticated(register)}>

            </Route>
            <Route exact path="/settings" component={UserIsAuthenticated(Settings)}>

            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    </Provider>
    
  );
}

export default App;
