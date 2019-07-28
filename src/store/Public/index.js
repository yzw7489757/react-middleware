const publicState = {
  comments: 'I\'m Public State'
};
export default (state = publicState, action) => {
  let newState = { ...state };
  switch (action.type) {
  default:
    break;
  }
  return newState;
};