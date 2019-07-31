import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function LazyReducer(props) {
  let segment = [];
  for (const attr in props) {
    !['dispatch'].includes(attr) && segment.push(<code key={attr}><pre>{attr} : {JSON.stringify(props[attr], null, 4)}</pre></code>);
  }
  
  return (
    <div className='App'>
      <div className='reducer'>
        { segment }
      </div>
      <div className='linkWrap'>
        <Link to='/'><button>go Index</button></Link> <br />
        <Link to='/Home'><button>go Home</button></Link> <br />
        <Link to='/User'><button>go User</button></Link> <br />
        <Link to='/ShopList'><button>go ShopList</button></Link> <br />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  let maps = {};
  for (let reducer in state) {
    maps[reducer] = state[reducer];
  }
  return maps;
}

export default connect(mapStateToProps, null)(LazyReducer);
