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