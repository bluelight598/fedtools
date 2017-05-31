import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import TopBar from './TopBar';
var $ = require('zepto');

export default class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
    	var self = this;
    	console.log(this.props)
        return (
        <div className="row">
            <div id="main-content" className="panel panel-primary" onClick={this._openAddModal}>
               点我console
            </div>
            <label>正文：<input className="J_context" type="text" placeholder="请输入添加的内容"/></label>
		 	<label><input className="clickme J_add" type="button" onClick={e => this._addItem(e)} />提交</label>
		 	<label><input className="clickme J_clear" type="button" onClick={e => this._clearItem(e)} />重置</label>
		 	<div className="content">
		 		<div>{this.props.content.conter}</div>
		 		<div>
		 			<TopBar content={this.props.content} />
		 		</div>
		 	</div>
        </div>
        );
    }

    _addItem(e) {
    	var text = $('.J_context').val();
    	this.props.actions.addItem(text);
    }

    _clearItem(e) {
    	this.props.actions.clearItem();
    }
 
    _openAddModal() {
		console.log('click');
	}
}

var mapStateToProps = function (state) {
    return state;
};

var mapDispatchToProps = function (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
