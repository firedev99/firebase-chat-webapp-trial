import { combineReducers } from "redux";
import * as actionTypes from '../action/types';

const INITIAL_STATE = {
    currentUser: null,
    isLoading: true
};

const INITIAL_CHANNEL_STATE = {
    currentChannel: null,
    isPrivateChannel: false,
    userPosts: null
};

const INITIAL_COLORS_STATE = {
    primaryColor: "#4c3c4c",
    secondaryColor: "eee",
};

//user
const user_reducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case actionTypes.SET_USER: 
        return {
            currentUser: action.payload.currentUser,
            isLoading: false 
        }
        case actionTypes.CLEAR_USER: 
        return {
            ...state,
            isLoading: false
        }
        default: 
        return state;
    }
};

//channel
const channel_reducer = (state = INITIAL_CHANNEL_STATE, action) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
        return {
            ...state,
            currentChannel: action.payload.currentChannel
        }
        case actionTypes.SET_PRIVATE_CHANNEL: 
        return {
            ...state,
            isPrivateChannel: action.payload.isPrivateChannel
        }
        case actionTypes.SET_USER_POSTS: 
        return {
            ...state,
            userPosts: action.payload.userPosts
        }
        default: 
        return state;
    }
};

//colors
const colors_reducer = (state = INITIAL_COLORS_STATE, action) => {
    switch(action.type) {
        case actionTypes.SET_COLORS: 
        return {
            primaryColor: action.payload.primaryColor,
            secondaryColor: action.payload.secondaryColor
        }
        default: 
        return state;
    }
};


const rootReducer = combineReducers({
    user: user_reducer,
    channel: channel_reducer,
    colors: colors_reducer
});

export default rootReducer;