import { 
  SEARCH_SHOP_BEGIN, 
  SEARCH_SHOP_FAIL, 
  SEARCH_SHOP_SUCCESS, 
  SEARCH_SHOP_FINALLY
} from '../constants';

export const searchShopBegin = (payload) => ({
  type: SEARCH_SHOP_BEGIN,
  payload
});
export const searchShopSuccess = (payload) => ({
  type: SEARCH_SHOP_SUCCESS,
  payload
});
export const searchShopFail = (payload) => ({
  type: SEARCH_SHOP_FAIL,
  payload
});
export const searchShopFinally = (payload) => ({
  type: SEARCH_SHOP_FINALLY,
  payload
});

export function reducer (state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
  case SEARCH_SHOP_BEGIN:
    // begin doSomething
    break;
  case SEARCH_SHOP_SUCCESS:
    // successful doSomething
    break;
  case SEARCH_SHOP_FAIL:
    // failed doSomething
    break;
  case SEARCH_SHOP_FINALLY:
    // whether doSomething
    break;
  default:
    break;
  }
  return newState;
}