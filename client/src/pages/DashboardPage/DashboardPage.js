import React, { Component } from 'react'
import "./DashboardPage.scss"
import Dashboard from "../../components/DashboardForm/DashboardForm"
import TweetBoard from "../../components/TweetsBoard/TweetsBoard"


export default class DashboardPage extends Component {
    render() {
        return (
            <div className="DashboardPage">
                <div className="DashboardPage__container">
                    <Dashboard/>
                    <TweetBoard/>
                </div>
            </div>
        )
    }
}
