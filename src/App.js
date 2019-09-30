import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Suscribers from './components/suscribers/Suscribers';
import NewSuscriber from './components/suscribers/NewSuscriber';
import SeeSuscriber from './components/suscribers/SeeSuscriber';
import EditSuscriber from './components/suscribers/EditSuscriber';

import Navbar from './components/layout/Navbar.js';

import Books from './components/books/Books';
import NewBook from './components/books/NewBook';
import SeeBook from './components/books/SeeBook';
import LoanBook from './components/books/LoanBook';
import EditBook from './components/books/EditBook';


import Login from './components/auth/Login';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';


function App() {
  return (
    <Provider store={store}>

      <Router>
        <Navbar/>
          <div className="container">

          <Switch>
            
            <Route exact path="/" component={ UserIsAuthenticated(Books) } />
            <Route exact path="/books/new" component={ UserIsAuthenticated(NewBook) } />
            <Route exact path="/books/see/:id" component={ UserIsAuthenticated(SeeBook) } />
            <Route exact path="/books/edit/:id" component={ UserIsAuthenticated(EditBook) } />
            <Route exact path="/books/Loan/:id" component={ UserIsAuthenticated(LoanBook) } />



            <Route exact path="/suscribers" component={ UserIsAuthenticated(Suscribers) } />
            <Route exact path="/suscribers/new" component={ UserIsAuthenticated(NewSuscriber) } />
            <Route exact path="/suscribers/:id" component={ UserIsAuthenticated(SeeSuscriber) } />
            <Route exact path="/suscribers/edit/:id" component={ UserIsAuthenticated(EditSuscriber) } />

            <Route exacth path="/login" component={ UserIsNotAuthenticated(Login) } />
      
          </Switch>
          
          </div>
      </Router>

    </Provider>
  );
}

export default App;
