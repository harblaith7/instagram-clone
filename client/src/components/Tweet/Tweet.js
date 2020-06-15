import React, { Component } from 'react'
import "./Tweet.scss"

export default class Tweet extends Component {
    render() {
        return (
            <div className="Tweet">
                <p className="Tweet__tweet">
                    {this.props.tweet.tweet}
                </p>
            </div>
        )
    }
}
