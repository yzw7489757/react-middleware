const ShopState = {
  shopList:[
    {shopName:'TV',shopPrice:'2399','desc':'电视特价了',id:'101'},
    {shopName:'Phone',shopPrice:'1999','desc':'手机特价了',id:'102'},
    {shopName:'Car',shopPrice:'699','desc':'平衡车特价了',id:'103'},
    {shopName:'Bracelet',shopPrice:'99','desc':'手环特价了',id:'104'},
  ]
}

export default (state = ShopState, action)=>{
  let newState = {...state}
  switch(action.type){
    case 'ADD_SHOP': //添加商品
    newState = {
      ...newState,
      shopList:newState.shopList.concat(action.data)
    }
    action.data.fn()
    break
    default:
    break
  }
  return newState
}