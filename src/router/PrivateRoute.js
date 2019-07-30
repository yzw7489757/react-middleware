import React, { lazy, Suspense } from 'react';
// import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { injectAsyncReducer, store } = props;
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route exact={true} path='/' name='index' component={lazy(async () => {
          const reducer = await import('../store/Main/index');// 引入reducer
          injectAsyncReducer(store, 'index', reducer.default);// 替换操作
          return import('../views/Index');
        })}
        ></Route>
        <Route {...props} exact={true} path='/home' name='home' component={lazy(async() => {
          const reducer = await import('../store/Home/index');
          injectAsyncReducer(store, 'home', reducer.default);
          return import('../views/Home');
        })}
        ></Route>
        <Route {...props} exact={true} path='/user' name='user' component={lazy(async() => {
          const reducer = await import('../store/User/index');
          injectAsyncReducer(store, 'user', reducer.default);
          return import('../views/User');
        })}
        ></Route>
        <Route {...props} exact={true} path='/shopList' name='shopList' component={lazy(async() => {
          const reducer = await import('../store/ShopList/index');
          injectAsyncReducer(store, 'shopList', reducer.default);
          return import('../views/ShopList');
        })}
        ></Route>
      </Switch>
    </Suspense>
  );
};
export default PrivateRoute;