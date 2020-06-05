import React, { Component } from 'react'
import {connect} from "react-redux"

export default class Alert extends Component {
    render() {
        return (
            <div className="Alert">
                <div className="Alert__container">
                    {this.props.message}
                </div>
            </div>
        )
    }
}
