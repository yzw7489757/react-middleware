import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configStore from './store'
import './index.css';
import App from './App';
import {
  Router , Route, Switch
} from 'react-router-dom';
import history from './router/history'
import * as serviceWorker from './serviceWorker';
const store = configStore()
ReactDOM.render(
<Provider store={store}>
  <Router  history={history}>
    <Switch>
      <Route exact path='/' render={()=><div>/</div>}></Route>
      <Route path='/Home' render={()=><div>/Home</div>}></Route>
    </Switch>
    <App />
  </Router >
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
