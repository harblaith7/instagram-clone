import { INSERT_ALERT, REMOVE_ALERT } from "../actions/type";

const initialState = []

export default (state = initialState, action) => {
    const {type, payload} = action

    switch(type){
        case INSERT_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return []
        default: return state
    }
}