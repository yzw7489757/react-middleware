import ActionTypes from './utils/actionTypes';
import warning from './utils/warning';
import isPlainObject from './utils/isPlainObject';

function getUndefinedStateErrorMessage(key, action) {
  // 如果任意一个 reducer 返回的state undefined 会踩到这个雷
  const actionType = action && action.type;
  const actionDescription =
  (actionType && `action "${String(actionType)}"`) || 'an action';
  // 即使没有值应该返回null，而不要返回undefined
  return (
    `Given ${actionDescription}, reducer "${key}" returned undefined. ` +
  `To ignore an action, you must explicitly return the previous state. ` +
  `If you want this reducer to hold no value, you can return null instead of undefined.`
  );
}

function getUnexpectedStateShapeWarningMessage(
  inputState,
  reducers,
  action,
  unexpectedKeyCache
) {
  const reducerKeys = Object.keys(reducers);
  // 辨认此次操作来源是来自内部初始化还是外部调用，大部分都是后者
  const argumentName = action && action.type === ActionTypes.INIT  
    ? 'preloadedState argument passed to createStore'
    : 'previous state received by the reducer';

  if (reducerKeys.length === 0) { // 合并成空的reducers也会报错
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    );
  }

  if (!isPlainObject(inputState)) { // state必须是个普通对象
    return (
      `The ${argumentName} has unexpected type of "` +
      {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
      `". Expected argument to be an object with the following ` +
      `keys: "${reducerKeys.join('", "')}"`
    );
  }
  // 过滤 state 与 finalReducers(也就是combineReducer定义时的有效 reducers)，
  // 拿到 state 多余的key值,比如 combineReducer 合并2个，但最后返回了3个对象
  const unexpectedKeys = Object.keys(inputState).filter(
    key => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]
  );
  // 标记警告这个值
  unexpectedKeys.forEach(key => {
    unexpectedKeyCache[key] = true;
  });
  
  // 辨别来源，replaceReducers表示设置此次替代Reducer，可以被忽略
  if (action && action.type === ActionTypes.REPLACE) { 
    return 
    ; 
  }
  // 告诉你有什么值是多出来的，会被忽略掉
  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    );
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(key => {
    // 遍历 reducer
    const reducer = reducers[key];
    // 初始化该 reducer，得到一个state值
    const initialState = reducer(undefined, { type: ActionTypes.INIT });
    // 所以一般reducer写法都是 export default (state={},action)=>{ return state}

    // 如果针对INIT有返回值，其他状态没有仍然是个隐患
    // 再次传入一个随机的 action ，二次校验。判断是否为 undefined
    const unknown = reducer(undefined, { type: ActionTypes.PROBE_UNKNOWN_ACTION() });

    // 初始化状态下 state 为 undefined => 踩雷
    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
          `If the state passed to the reducer is undefined, you must ` +
          `explicitly return the initial state. The initial state may ` +
          `not be undefined. If you don't want to set a value for this reducer, ` +
          `you can use null instead of undefined.`
      );
    }
    // 随机状态下 为 undefined  => 踩雷
    if (typeof unknown === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
          `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
          `namespace. They are considered private. Instead, you must return the ` +
          `current state for any unknown actions, unless it is undefined, ` +
          `in which case you must return the initial state, regardless of the ` +
          `action type. The initial state may not be undefined, but can be null.`
      );
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};// 收集有效的reducer
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        // 这个reducerKey 的 reducer是 undefined
        warning(`No reducer provided for key "${key}"`);
      }
    }

    if (typeof reducers[key] === 'function') {
      // reducer必须是函数，无效的数据不会被合并进来
      finalReducers[key] = reducers[key];
    }
  }
  // 所有可用reducer
  const finalReducerKeys = Object.keys(finalReducers);

  // This is used to make sure we don't warn about the same
  // keys multiple times.
  let unexpectedKeyCache; // 配合getUnexpectedStateShapeWarningMessage辅助函数过滤掉多出来的值
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);//校验reducers是否都是有效数据
  } catch (e) {
    shapeAssertionError = e; // 任何雷都接着
  }
  // 返回一个合并后的 reducers 函数，与普通的 reducer 一样
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      // 开发环境下校验有哪些值是多出来的
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      );
      if (warningMessage) {
        warning(warningMessage);
      }
    }

    let hasChanged = false; // mark值是否被改变
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]; // reducerKey
      const reducer = finalReducers[key]; // 对应的 reducer
      const previousStateForKey = state[key]; // 改变之前的 state
      // 对每个reducer 做 dispatch，拿到 state 返回值
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') { // 如果state是undefined就准备搞事情
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey; // 收录这个reducer
      // 检测是否被改变过
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      // console.table({
      //   'previousStateForKey': previousStateForKey,
      //   'nextStateForKey: ': nextStateForKey,
      //   'comparison': previousStateForKey === nextStateForKey
      // });
    }
    // 如果没有值被改变，就返回原先的值，避免性能损耗
    return hasChanged ? nextState : state;
  };
}