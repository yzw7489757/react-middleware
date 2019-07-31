import { reducer as addShop } from './store/add';
import { reducer as removeShop } from './store/delete';
import { reducer as changeShop } from './store/change';
import { reducer as searchShop } from './store/search';

const shopReducer = [
  addShop, 
  removeShop, 
  changeShop, 
  searchShop
];
let initialState = {
  hasLoaded: false 
};
export default (state = initialState, action) => {
  let newState = { ...state }; 
  // const shopReducerKeys = Object.keys(shop);
  // shopReducerKeys.forEach(key => {
  //   Object.prototype.hasOwnProperty.call(shop, key) && shopReducer.push(shop[key]);
  // });
  switch (action.type) {
  default:
    break;
  }
  console.log('newState: ', newState);
  return shopReducer.reduce((preReducer, nextReducer) => nextReducer(preReducer, action), newState);
};