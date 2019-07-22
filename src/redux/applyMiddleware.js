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
   // 返回一个enhancer增强器，enhancer的参数应该是一个createStore函数。
  return createStore => (...args) => {
    // 先创建store，或者说，创建已经被前者增强过的store
    const store = createStore(...args)
    // 如果还没有改造前，被调用直接抛出错误
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    // 暂存增强前的store
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 遍历中间件 call(oldStore)，改造store，得到改造后的store数组
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 组合中间件，将改造前的dispatch传入，每个中间件都将得到一个改造/增强过后的dispatch。
    dispatch = compose(...chain)(store.dispatch)

    // 最终返回一个增强后的store
    return {
      ...store,
      dispatch
    }
  }
}