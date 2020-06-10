
import axios from "axios"
import { insertAlert } from "./alert"
import { REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL} from "./type"
import setAuthToken from "../utils/setAuthToken"

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get("http://localhost:5000/api/auth") 

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

        console.log(res)

    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        })
    }
}


export const register = ({firstName, lastName, email, password}) => async dispatch => {

    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    const body = {
        firstName,
        lastName,
        email,
        password
    }

    try {
        
       const res = await axios.post("http://localhost:5000/api/auth/signup", body, config) 

       console.log(res.data)

       dispatch({
           type: REGISTER_SUCCESS,
           payload: res.data
       })

       dispatch(loadUser())

    } catch (err) {
        const error = err.response.data.errors[0].msg;

        dispatch({
            type: REGISTER_FAIL,
        })

        dispatch(insertAlert(error))
    }

} 


export const login = ({email, password}) => async dispatch => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    const body = {
        email,
        password
    }

    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())

    } catch (err) {
        if(err.response) {
            dispatch(insertAlert(err.response.data.errors[0].msg))
        }
        
        dispatch({
            type: LOGIN_FAIL,
        })

        
    }
} 













/*
import axios from "axios"
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL
  } from "./type";
import { insertAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken"


// LOAD USER
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get("http://localhost:5000/api/auth");

        dispatch({
            type: USER_LOADED,
            // payload is the user
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// REGISTER A USER
export const register = ({firstName, lastName, email, password}) => async dispatch => {

    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    const body = {
        firstName,
        lastName,
        email,
        password
    }

    try {
        const res = await axios.post("http://localhost:5000/api/auth/signup", body, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) dispatch(insertAlert(errors[0].msg))

        dispatch({
          type: REGISTER_FAIL,
        })
    }

}


// LOG IN USER
export const login = ({email, password}) => async dispatch => {

    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    const body = {
        email,
        password
    }

    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) dispatch(insertAlert(errors[0].msg))

        dispatch({
          type: LOGIN_FAIL,
        })
    }

}



*/