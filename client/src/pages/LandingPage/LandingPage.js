import React, { Component } from 'react'
import Header from "../../components/Header/Header"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

 class LandingPage extends Component {
    render() {

        if(this.props.isAuth === true){
            return <Redirect to="/dashboard" />
        }

        return (
            <div className="LandingPage">
                <div className="LandingPage__container">
                    <Header/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated
})


export default connect(mapStateToProps)(LandingPage)