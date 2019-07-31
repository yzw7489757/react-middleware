import { createStore, applyMiddleware, compose } from '../redux/index.js';
import createReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';
import history from 'router/history';

const logger = store => {
  return next => action => {
    return next(action);
  };
};

export default function configStore(initialState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = applyMiddleware(logger, routerMiddleware(history));
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancer(enhancer)
  );
  
  store.asyncReducers = {};//  隔离防止对store其他属性的修改

  function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  }
  
  return {
    store,
    injectAsyncReducer
  };
}
