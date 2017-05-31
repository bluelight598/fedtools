/*
 * actions
 */
var $ = require('zepto');

export const ADD_ITEM = 'ADD_ITEM';
export const CLEAR_ITEM = 'CLEAR_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';

/*
 * actions creators
 */
export function addItem(text) {
    return {
        type: ADD_ITEM,
        text: text
    };
}

export function clearItem(index) {
    return {
        type: CLEAR_ITEM
    };
}

export function editItem(index, name, number) {
    return {
        type: EDIT_ITEM,
        index,
        name, 
        number
    };
}