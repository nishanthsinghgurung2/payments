import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import store from './state/store'
import AddNewPayment from './components/AddNewPayment'
import Home from './components/Home';
import EditPayment from './components/EditPayment'

export default () => (
  <div className="App">
    <Provider store={store}>
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
    </Provider>
  </div>
)
