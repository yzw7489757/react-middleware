import { 
  CHANGE_SHOP_BEGIN, 
  CHANGE_SHOP_FAIL, 
  CHANGE_SHOP_SUCCESS, 
  CHANGE_SHOP_FINALLY
} from '../constants';

export const changeShopBegin = (payload) => ({
  type: CHANGE_SHOP_BEGIN,
  payload
});
export const changeShopSuccess = (payload) => ({
  type: CHANGE_SHOP_SUCCESS,
  payload
});
export const changeShopFail = (payload) => ({
  type: CHANGE_SHOP_FAIL,
  payload
});
export const changeShopFinally = (payload) => ({
  type: CHANGE_SHOP_FINALLY,
  payload
});

export function reducer (state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
  case CHANGE_SHOP_BEGIN:
    // begin doSomething
    break;
  case CHANGE_SHOP_SUCCESS:
    // successful doSomething
    break;
  case CHANGE_SHOP_FAIL:
    // failed doSomething
    break;
  case CHANGE_SHOP_FINALLY:
    // whether doSomething
    break;
  default:
    break;
  }
  return newState;
}