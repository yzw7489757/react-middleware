export const addShop = (shopInfo) => {
  return {
    type: "ADD_SHOP",
    data: shopInfo
  };
};
export const removeShop = (shopId) => {
  return {
    type: "REMOVE_SHOP",
    data: shopId
  };
};