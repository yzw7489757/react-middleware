import React from 'react';
import { connect } from 'react-redux'
import { Random } from 'mockjs'
import logo from './logo.svg';

function App(props) {
  const {shopList, addShop} = props
  return (
    <div className="App">
    <button 
      className='addingNewGoods'
      onClick={()=>addShop({
        shopName:Random.cname(),
        shopPrice:Random.natural(100, 10000),
        desc:Random.ctitle(5),
        id:Random.id()
      })}>
      ADD SHOP
    </button>

    <ul className='shopList'>
        {
          shopList.map(d=>{
            return (
              <li key={d.id}>
                <img src={logo} alt={d.name}/>
                <h4>{d.shopName}</h4>
                <p>{d.shopPrice}</p>
                <span>{d.desc}</span>
              </li>
            )
          })
        }
        </ul>
    </div>
  );
}
function mapStateToProps(state) {
  return { shopList:state.ShopState.shopList }
}

function mapDispatchToProps(dispatch) {
  return { 
    addShop:(shopInfo)=>{
      dispatch({
        type:"ADD_SHOP",
        data:shopInfo
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps,null,{pure:false})(App);
