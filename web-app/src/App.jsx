import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor} from './state/store'
import AddNewPayment from './components/AddNewPayment'
import Home from './components/Home';
import EditPayment from './components/EditPayment'

export default () => (
  <div className="App">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/add-new-payment">
              <AddNewPayment />
            </Route>
              <Route exact path="/edit-payment/:paymentId" component={EditPayment} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </div>
)
