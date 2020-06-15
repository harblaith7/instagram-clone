import React, { Component } from 'react'
import Tweet from "../Tweet/Tweet"
import "./TweetsBoard.scss"

export default class TweetsBoard extends Component {

    constructor(props){
        super(props)
        this.state = {
            tweets: [
                {
                    tweet: "I love ants",
                    userfirstName: "Laith"
                },
                {
                    tweet: "I do not like jaguars",
                    userfirstName: "Laith"
                }
            ]
        }
    }


    displayTweets = () => {
        return this.state.tweets.map(tweet => {
            return <Tweet tweet = {tweet} />
        })
    }

    render() {
        return (
            <div className="TweetsBoard">
                {this.displayTweets()}
            </div>
        )
    }
}
