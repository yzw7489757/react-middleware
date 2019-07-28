
const initialState = { 
  main: [] 
};
export default (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
  default:
    console.log('Main Reducer');
    break;
  }
  return newState;
};