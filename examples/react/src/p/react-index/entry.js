var $ = require('zepto');

import { createStore, combineReducers } from 'redux';

import { Provider, connect } from 'react-redux';

var View = require('../../c/react-index/index');

window.React = require('react');
window.ReactDom = require('react-dom');

const initState = {
	items: [],
	clickTime: 0
};
var listReducer = function(state = initState.items, action) {
	switch (action.type) {
		case 'ADD_TASK':
			console.log('-> ADD_TASK');
			return [...state, action.value];
		case 'CLEAR_TASK':
			console.log('-> CLEAR_TASK');
			return [];
		default:
			return state;
	}
}

var taskReducer = function(state = initState.clickTime, action) {
	switch (action.type) {
		case 'ADD_NUM':
			console.log('-> ADD_NUM : ',state+1);
			return state+1;	
		default:
			return state;
	}
}

const reducer = combineReducers({
    listReducer,
    taskReducer
});

var store = createStore(reducer);

$('.clickme').on('click', function(e) {
	var $target = $(this);
	var value = $('.J_context').val();
	if ($target.hasClass('J_add')) {
		store.dispatch({
			type: 'ADD_TASK',
			value: value
		});
	} else if ($target.hasClass('J_clear')) {
		store.dispatch({
			type: 'CLEAR_TASK',
			value: []
		});
	} else if ($target.hasClass('J_addnum')) {
		store.dispatch({
			type: 'ADD_NUM'
		});
	}

	console.log('state after ADD_TASK action:', store.getState());
});

let unsubscribe = store.subscribe(() => {
    console.log('State change to:', store.getState()); 
});


const root = (
  <Provider store={store} key="provider">
  	<div>1234556</div>
  	<View />
  </Provider>
)

ReactDom.render(
  root,
  document.getElementById('root')
)
