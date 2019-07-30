import { combineReducers } from '../redux';
import { connectRouter } from 'connected-react-router';
import history from 'router/history';
import publicState from 'store/Public';
export default function createReducer(asyncReducers) {
  return combineReducers({
    router: connectRouter(history),
    public: publicState,
    ...asyncReducers// 异步Reducer
  });
}