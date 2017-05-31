import { combineReducers } from 'redux'
import { ADD_ITEM, CLEAR_ITEM, EDIT_ITEM } from './actions'


function contacts(state = [], action) {
    switch (action.type) {
        case EDIT_ITEM:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, {'name': action.name, 'number': action.number}),
                ...state.slice(action.index + 1)
            ];
            
        default:
            return state;
    }
}

function content(state = {}, action) {
	 switch (action.type) {
        case ADD_ITEM:
			return {
				'items': [...state.items, action.text],
				'counter': state.counter + 1
			};
            
        case CLEAR_ITEM:
			return {
				'items': [],
				'counter': 0
			};
            
        default:
            return state;
    }
}
 
const contactApp = combineReducers({
    contacts,
    content
});

export default contactApp;