import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./Header.scss"

export default class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="Header__container">
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        )
    }
}
