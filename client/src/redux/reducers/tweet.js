const { TWEETS_FETCHED_FAILED, TWEETS_FETCHED_SUCCESS } = require("../actions/type");


const initialState = {
    tweets: {}
}


export default (state = initialState, action ) => {
    const {type, payload} = action;

    switch(type){
        case TWEETS_FETCHED_SUCCESS:
            return {
                ...payload
            };
        case TWEETS_FETCHED_FAILED:
            return {
                ...payload
            };
        default:
            return state
        
    }
}