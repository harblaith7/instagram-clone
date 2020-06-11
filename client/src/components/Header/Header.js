import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./Header.scss"

export default class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="Header__container">
                    <Link to="/login" className="Header__link Header__link--login">Log in</Link>
                    <Link to="/signup" className="Header__link Header__link--signup">Sign up</Link>
                </div>
            </div>
        )
    }
}
