import _ from 'lodash';
import {   
    CREATE_STREAM,
    SHOW_STREAM,
    UPDATE_STREAM,
    LIST_STREAMS,
    DELETE_STREAM
    } from '../actions/types';


export default (state ={}, action)=> {
    switch(action.type){
        case LIST_STREAMS:
            return   {...state, ..._.mapKeys(action.payload, 'id')};
        case SHOW_STREAM: 
            return   {...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return   {...state, [action.payload.id]: action.payload };
        case UPDATE_STREAM:
            return   {...state, [action.payload.id]: action.payload };
        case DELETE_STREAM: 
            return   _.omit(state, action.payload);
        default:
            return  state  
    }
}