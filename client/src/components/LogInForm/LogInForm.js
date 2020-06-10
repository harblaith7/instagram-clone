import React, { Component } from 'react'
import "./LogInForm.scss"
import Alert from "../Alerts/Alert"
import {Redirect} from "react-router-dom"
import { login } from '../../redux/actions/auth';
import {connect} from "react-redux"

 class LogInForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            userInput: {
                email: "",
                password: "",
            }
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const {email, password} = this.state.userInput;

        await this.props.login(this.state.userInput)

        // if(this.props.user.token) {
        //     console.log(this.props.user.token)
        //     this.setState({
        //         userInput: {
        //             email: "",
        //             password: "",
        //         }
        //     })
        // }

        
    }

    handleChange = (e) => {
        let updatedState = this.state.userInput;
        updatedState[e.target.name] = e.target.value;
        
        this.setState({
            userInput: updatedState
        })
    }

    render() {

        if(this.props.isAuth === true){
            return <Redirect to="/dashboard" />
        }

        const {alert} = this.props

        return (
            <div className="SignUpForm">
                {alert.length ? <Alert alertMessage={alert[0]}/> : ""}
                <form className="SignUpForm__form" onSubmit={this.handleSubmit}>
                    <input type="text" className="SignUpForm__input" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.userInput.email}/>
                    <input type="password" className="SignUpForm__input" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.userInput.password}/>
                    <input type="submit" className="SignUpForm__input" value="Sign up"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    alert : state.alert,
    isAuth : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(LogInForm)




/*


const mapStateToProps = (state) => ({
    alert : state.alert,
    isAuth: state.user.isAuthenticated,
    user: state.user
})

export default connect(mapStateToProps, {insertAlert, login})(LogInForm)

*/