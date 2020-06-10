import React, { Component } from 'react'
import Header from "../../components/Header/Header"

export default class LandingPage extends Component {
    render() {
        return (
            <div className="LandingPage">
                <div className="LandingPage__container">
                    <Header/>
                </div>
            </div>
        )
    }
}
