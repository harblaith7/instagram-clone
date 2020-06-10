import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/type";

const initialState = {
    isAuthenticated: false,
    loading: true,
    token : localStorage.getItem("token"),
    user: null
}


export default (state = initialState, action) => {
    const {type, payload} = action

    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem("token")
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null,
                user: null
            };
        default:
            return state
    }

}









/*
import { REGISTER_FAIL, REGISTER_SUCCESS , USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/type";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem("token")
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null,
                user: null
            };
        default: 
            return state
    }

}

*/