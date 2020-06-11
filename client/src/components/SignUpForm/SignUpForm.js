import React, { Component } from 'react'
import "./SignUpForm.scss"
import Alert from "../Alerts/Alert"
import {register} from "../../redux/actions/auth"
import {insertAlert} from "../../redux/actions/alert"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"


 class SignUpForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            userInput: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const {firstName, lastName, email, password, confirmPassword} = this.state.userInput;

        if(password !== confirmPassword) {
            return this.props.insertAlert("The Password does not match")
        }

        this.props.register(this.state.userInput)

        if(this.props.auth.token) {
            this.setState({
                userInput: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }
            })
        }

        
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
                    <input type="text" className="SignUpForm__input" placeholder="First Name" name="firstName" onChange={this.handleChange} value={this.state.userInput.firstName}/>
                    <input type="text" className="SignUpForm__input" placeholder="Last Name" name="lastName" onChange={this.handleChange} value={this.state.userInput.lastName}/>
                    <input type="text" className="SignUpForm__input" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.userInput.email}/>
                    <input type="password" className="SignUpForm__input" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.userInput.password}/>
                    <input type="password" className="SignUpForm__input" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange} value={this.state.userInput.confirmPassword}/>
                    <input type="submit" className="SignUpForm__input SignUpForm__input--sbtBtn" value="Sign up"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    alert: state.alert,
    auth: state.auth,
    isAuth : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {insertAlert, register})(SignUpForm)