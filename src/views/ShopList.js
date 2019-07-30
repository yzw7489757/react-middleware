import React from 'react';
import { connect } from 'react-redux';
import { Random } from 'mockjs';
import logo from '../logo.svg';
import bindActionCreators from '../redux/bindActionCreators';
import * as shop from 'store/ShopList/actionCreators';
function App(props) {
  const { addShop, shopList } = props;

  const shopData = () => ({
    name: Random.cname(),
    price: Random.natural(100, 10000),
    desc: Random.ctitle(5),
    id: Random.id()
  });

  return (
    <div className='App'>
      <button 
        className='addingNewGoods'
        onClick={() => addShop(shopData())}
      >ADD SHOP
      </button>
      
      <ul className='shopList'>
        {
          shopList.map(d => {
            return (
              <li key={d.id}>
                <img src={logo} alt={d.name}/>
                <h4>{d.name}</h4>
                <p>{d.price}</p>
                <span>{d.desc}</span>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
function mapStateToProps(state) {
  
  return { 
    shopList: state.shopList.shopList || []
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shop, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
