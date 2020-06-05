import { SET_ALERT, REMOVE_ALERT } from "./types"
import uuid from "uuid/dist/v4"



export const setAlert = (message) => dispatch => {

    const id = uuid()

    dispatch({
        type: SET_ALERT,
        payload: {
            message,
            id
        }
    })

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }, 3000)
}