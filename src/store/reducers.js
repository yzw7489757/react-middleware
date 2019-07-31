import { combineReducers } from '../redux';
import { connectRouter } from 'connected-react-router';
import history from 'router/history';
import publicState from 'store/Public';
import shopOperation from './Shop/reducers';

export default function createReducer(asyncReducers) {
  return combineReducers({
    router: connectRouter(history),
    shop: shopOperation,
    public: publicState,
    ...asyncReducers// 异步Reducer
  });
}