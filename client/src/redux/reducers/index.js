import {combineReducers} from "redux"
import alert from "../reducers/alert"
import auth from "./auth";
import tweets from "./tweet"



export default combineReducers({
    alert,
    auth,
    tweets
})