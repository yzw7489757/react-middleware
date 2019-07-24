import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
   // 返回一个enhancer增强器函数，enhancer的参数是一个createStore函数。等待被enhancer(createStore)
  return createStore => (...args) => {
    // 先创建store，或者说，创建已经被前者增强过的store
    const store = createStore(...args)
    // 如果还没有改造完成，就先被调用直接抛出错误
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    // 暂存改造前的store
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 将store传入，等待 logger(store) 返回的 next => action => next(action)
    // const logger = store => next => action => { console.log(store); next(action) }
    // const handlerPrice = store => next => action => { console.log(store); next(action) }
    // 遍历中间件 call(oldStore)，改造store，得到改造后的store数组
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    /* 每次middleware(middlewareAPI) 应用中间件，都相当于 logger(store)一次，store也随之改变，返回两个next形参函数
    * [next => action => { console.log(store); next(action) },// logger
    *  next => action => { console.log(store); next(action) }] // handlerPrice
    * 随之两个中间件等待被compose, 每个都可以单独访问next/dispatch前后的store
    */ 
    dispatch = compose(...chain)(store.dispatch)
    // 先将所有的中间件compose合并，然后将store.dispatch作为next形数传入，得到每个action => store.dispatch(action)
    // 也就行上文的 next(action) === store.dispatch(action)
    // 最终抛出一个compose后的增强dispatch与store
    return {
      ...store,
      dispatch
    }
  }
}