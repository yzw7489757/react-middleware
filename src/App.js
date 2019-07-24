import React,{useState,useEffect} from 'react';
// import { connect } from 'react-redux'
import { Random } from 'mockjs'
import logo from './logo.svg';
import store from './store/index'
import { Link} from 'react-router-dom'

const { subscribe ,getState, dispatch } = store()

function App(props) {
  let [shopList,setShopList] = useState(getState().shopList)
  useEffect(()=>{
    subscribe(()=>{
      setShopList(getState().shopList)
    })
  },[shopList])

  const addShop = () => dispatch({
    type:'ADD_SHOP',
    data:{
      shopName:Random.cname(),
      shopPrice:Random.natural(100, 10000),
      desc:Random.ctitle(5),
      id:Random.id()
    }
  })
  
  return (
    <div className="App">
      <Link to='/Home'>我去Home</Link>
      <br/>
      <Link to='/'>我去/</Link>
    <button 
      className='addingNewGoods'
      onClick={addShop}>
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
// function mapStateToProps(state) {
//   return { shopList:state.shopList }
// }

// function mapDispatchToProps(dispatch) {
//   return { 
//     addShop:(shopInfo)=>{
//       dispatch({
//         type:"ADD_SHOP",
//         data:shopInfo
//       })
//     }
//   }
// }
// @connect(mapStateToProps,mapDispatchToProps,null,{pure:false})
export default (App);
