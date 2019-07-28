
export default (state = { Home: [] }, action) => {
  let newState = { ...state };
  switch (action.type) {
  default:
    console.log('Home Reducer');
    break;
  }
  return newState;
};