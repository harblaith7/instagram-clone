import React, { Component } from 'react'
import {postTweet} from "../../redux/actions/tweets"
import {connect} from "react-redux"

 class Dashboard extends Component {

    constructor(props){
        super(props)
        this.state = {
            tweetInput : ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.props.postTweet(this.state.tweetInput)

    }

    handleChange = (e) => {
        this.setState({
            tweetInput : e.target.value
        })
    }

    render() {
        return (
            <form className="Dashboard" onSubmit={this.handleSubmit}>
                <div className="Dashboard__container">
                    <input type="text" className="Dashboard__input" onChange={this.handleChange} value={this.state.tweetInput}/>
                    <input type="submit" className="Dashboard__submit"/>
                </div>
            </form>
        )
    }
}


export default connect(null, {postTweet})(Dashboard)