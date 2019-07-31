import React from 'react';
import { addShopBegin } from 'store/Shop/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from '../redux/index';

const Home = (props) => {
  const { changeLoaded } = props;
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => changeLoaded(false)}>changeLoaded</button>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeLoaded: addShopBegin }, dispatch);
}
export default connect(null, mapDispatchToProps)(Home);