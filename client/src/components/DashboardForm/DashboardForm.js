import React, { Component } from 'react'

export default class Dashboard extends Component {
    render() {
        return (
            <form className="Dashboard">
                <div className="Dashboard__container">
                    <input type="text" className="Dashboard__input"/>
                    <input type="submit" className="Dashboard__submit"/>
                </div>
            </form>
        )
    }
}
