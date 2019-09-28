import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Suscribers from './components/suscribers/Suscribers';
import NewSuscriber from './components/suscribers/NewSuscriber';
import SeeSuscriber from './components/suscribers/SeeSuscriber';
import EditSuscriber from './components/suscribers/EditSuscriber';
import Navbar from './components/layout/Navbar.js';


function App() {
  return (
    <Provider store={store}>

      <Router>
        <Navbar/>
          <div className="container">

          <Switch>
        
            <Route exact path="/suscribers" component={ Suscribers } />

            <Route exact path="/suscribers/new" component={ NewSuscriber } />

            <Route exact path="/suscribers/:id" component={ SeeSuscriber } />

            <Route exact path="/suscribers/edit/:id" component={ EditSuscriber } />
      
          </Switch>
          
          </div>
      </Router>

    </Provider>
  );
}

export default App;
