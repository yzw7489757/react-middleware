import { 
  ADD_SHOP_BEGIN, 
  ADD_SHOP_FAIL, 
  ADD_SHOP_SUCCESS, 
  ADD_SHOP_FINALLY
} from '../constants';

export const addShopBegin = (payload) => ({
  type: ADD_SHOP_BEGIN,
  payload
});
export const addShopSuccess = (payload) => ({
  type: ADD_SHOP_SUCCESS,
  payload
});
export const addShopFail = (payload) => ({
  type: ADD_SHOP_FAIL,
  payload
});
export const addShopFinally = (payload) => ({
  type: ADD_SHOP_FINALLY,
  payload
});

export function reducer (state = { }, action) {
  let newState = { ...state };
  switch (action.type) {
  case ADD_SHOP_BEGIN:
    newState = {
      ...newState,
      hasLoaded: !newState.hasLoaded
    };
    // begin doSomething
    break;
  case ADD_SHOP_SUCCESS:
    // successful doSomething
    break;
  case ADD_SHOP_FAIL:
    // failed doSomething
    break;
  case ADD_SHOP_FINALLY:
    // whether doSomething
    break;
  default:
    break;
  }
  return newState;
}