require('./index.less');

import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../c/react-index/components/Root'
import configureStore from '../../c/react-index/redux/configureStore';

var initialState = {
  contacts: [{
    name: "Wilber",
    number: "13111111191"
  } , {
    name: "Will",
    number: "13111191112"
  }],
  content: {
  	counter: 0,
  	items: []
  },

}

var store = configureStore(initialState);


ReactDOM.render(
  <Root store={store} />, 
  document.getElementById('root')
);