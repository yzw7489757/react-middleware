import { createStore,applyMiddleware, compose } from '../redux/index.js'
import ShopState from './reducer'

/**
* @params [reducer] (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
* @params [preloadedState] (any): 初始时的 state。 在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它
* @params [enhancer] (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。
*/
const logger = store => next => action => {
  console.log('logger before', store.getState())
  const returnValue = next(action)
  console.log('logger after', store.getState())
  return returnValue
}

// const changeTitle = store => next => action => {
//   console.log('changeTitle before', store.getState())
//   const returnValue = next(action)
//   console.log('changeTitle after', store.getState())
//   return returnValue
// }

// const handlerAction = store => next => action => {
//   console.log('action: ', action);
//   action = {
//     ...action,
//     data:{
//       ...action.data,
//       shopPrice:action.data.shopPrice + '.00'
//     }
//   }
//   const returnValue = next(action)
//   return returnValue
// }

export default function configStore(preloadedState){
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = applyMiddleware(logger)
  const store = createStore(
    ShopState,
    preloadedState,
    composeEnhancer(enhancer,enhancer))
  return store;
}