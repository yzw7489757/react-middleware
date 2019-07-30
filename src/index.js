import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configStore from 'store/index';
import './index.css';
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from 'router/PrivateRoute';
import history from 'router/history';
import LazyReducer from 'views/LazyReducer';

import * as serviceWorker from './serviceWorker';
const { store, injectAsyncReducer } = configStore();
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter history={history}>
        <PrivateRoute injectAsyncReducer={injectAsyncReducer} store={store}></PrivateRoute>
        <LazyReducer/>
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
