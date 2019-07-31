import React, { lazy, Suspense } from 'react';
// import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';


const PrivateRoute = (props) => {
  const { injectAsyncReducer, store } = props;

  const withReducer = async (name) => {
    const componentDirName = name.replace(/^\S/, s => s.toUpperCase()); // 规定views和store关联文件首字母大写
    const reducer = await import(`../store/${componentDirName}/index`);// 引入reducer
    injectAsyncReducer(store, name, reducer.default);// 替换操作
    return import(`../views/${componentDirName}`);
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route {...props} exact={true} path='/' name='main' component={lazy(() => withReducer('main'))} />
        <Route {...props} exact={true} path='/home' name='home' component={lazy(() => withReducer('home'))}/>
        <Route {...props} exact={true} path='/user' name='user' component={lazy(() => withReducer('user'))}/>
        <Route {...props} exact={true} path='/shopList' name='shopList' component={lazy(() => withReducer('shopList'))}/>
      </Switch>
    </Suspense>
  );
};
export default PrivateRoute;