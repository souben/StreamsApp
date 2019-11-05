import streams from '../api/streams';
import history from '../history';
import {SIGN_IN,
        SIGN_OUT,
        CREATE_STREAM,
        SHOW_STREAM,
        UPDATE_STREAM,
        LIST_STREAMS,
        DELETE_STREAM
    } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// CREATE_STREAM
export const  createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth; 
    
    const response = await streams.post('/streams', {...formValues, userId});
    dispatch ({ type : CREATE_STREAM, payload : response.data })
    
    //Do some programmatic navigation 
    history.push('/')
    
} 

//LIST_STREAMS
export const  listStreams = () => async dispatch => {
    
    const response = await streams.get('/streams');
    dispatch ({ type : LIST_STREAMS, payload : response.data })
} 

//SHOW_STREAM
export const  showStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch ({ type : SHOW_STREAM, payload : response.data })
} 

// UPDATE_STREAM
export const  updateStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);
    dispatch ({ type : UPDATE_STREAM, payload : response.data })
} 

// DELETE_STREAM
export const  deleteStream = (id) => async dispatch => {
    await streams.delete('/streams/:id');
    dispatch ({ type : DELETE_STREAM, payload: id })
} 