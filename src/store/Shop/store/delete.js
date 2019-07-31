import { 
  DELETE_SHOP_BEGIN, 
  DELETE_SHOP_FAIL, 
  DELETE_SHOP_SUCCESS, 
  DELETE_SHOP_FINALLY
} from '../constants';

export const deleteShopBegin = (payload) => ({
  type: DELETE_SHOP_BEGIN,
  payload
});
export const deleteShopSuccess = (payload) => ({
  type: DELETE_SHOP_SUCCESS,
  payload
});
export const deleteShopFail = (payload) => ({
  type: DELETE_SHOP_FAIL,
  payload
});
export const deleteShopFinally = (payload) => ({
  type: DELETE_SHOP_FINALLY,
  payload
});

export function reducer (state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
  case DELETE_SHOP_BEGIN:
    // begin doSomething
    break;
  case DELETE_SHOP_SUCCESS:
    // successful doSomething
    break;
  case DELETE_SHOP_FAIL:
    // failed doSomething
    break;
  case DELETE_SHOP_FINALLY:
    // whether doSomething
    break;
  default:
    break;
  }
  return newState;
}