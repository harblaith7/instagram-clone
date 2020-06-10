import { INSERT_ALERT, REMOVE_ALERT } from "./type";



export const insertAlert = (msg) => dispatch => {

    console.log("Action Running", msg)

    dispatch({
        type: INSERT_ALERT,
        payload: msg
    })

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT
        })
    }, 3000)

}
