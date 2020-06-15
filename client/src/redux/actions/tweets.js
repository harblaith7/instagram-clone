import axios from "axios"



export const postTweet = (tweet) => async dispatch => {
    const body = {tweet}
    try {
        const res = await axios.post("http://localhost:5000/api/tweets", body)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }  
}

export const getTweets = () => async dispatch => {
    try {
        const res = await axios.get("http://localhost:5000/api/tweets")
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}