const user = {
  token: '',
  uid: '',
  permission: []
};

export default (state = user, action) => {
  let newState = { ...state };
  return newState;
};