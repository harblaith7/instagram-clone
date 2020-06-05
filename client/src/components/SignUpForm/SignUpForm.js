import React, { Component } from 'react'
import {connect} from "react-redux"
import {setAlert} from "../../redux/actions/alert"
import Alert from "../Alert/Alert"

 class SignUpForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            userInput : {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        }
    }

    handleChange = (e) => {

        const {userInput} = this.state

        let updatedState = {
            ...userInput,
            [e.target.name] : e.target.value
        }

        this.setState({
            userInput : updatedState
        })
    }

    handleSubmit = (e) => {
        
        e.preventDefault()

        const {userInput} = this.state

        // CHECKS IF THERE ARE ANY MISSING FIELDS
        for(let key in userInput){
            if(userInput[key] === ""){
                return this.props.setAlert("You are missing a field")
            }
        }

        // CHECKS IF PASSWORDS ARE A MATCH
        if(userInput.password !== userInput.confirmPassword){
            return this.props.setAlert("Your passwords don't match up")
        }
        
    }

    displayAlerts = () => {
        return this.props.alerts.map(alert => {
            return <Alert message={alert.message} />
        })
    }

    render() {
        return (
            <div className="SignUpForm">
                <div className="SignUpForm__container">
                    {this.props.alerts.length ? this.displayAlerts() : ""}
                    <form action="" className="SignUpForm__form" onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            className="SignUpForm__input" 
                            placeholder="First Name" 
                            name="firstName"
                            onChange = {this.handleChange}
                            value={this.state.userInput["firstName"]}
                        />
                        <input 
                            type="text" 
                            className="SignUpForm__input" 
                            placeholder="Last Name" 
                            name="lastName"
                            onChange = {this.handleChange}
                            value={this.state.userInput["lastName"]}
                        />
                        <input 
                            type="email" 
                            className="SignUpForm__input" 
                            placeholder="Email" 
                            name="email"
                            onChange = {this.handleChange}
                            value={this.state.userInput["email"]}
                        />
                        <input 
                            type="password" 
                            className="SignUpForm__input" 
                            placeholder="Password" 
                            name="password"
                            onChange = {this.handleChange}
                            value={this.state.userInput["password"]}
                        />
                        <input 
                            type="password" 
                            className="SignUpForm__input" 
                            placeholder="Confirm Password" 
                            name="confirmPassword"
                            onChange = {this.handleChange}
                            value={this.state.userInput["confirmPassword"]}
                        />
                        <input 
                            type="submit" 
                            className="SignUpForm__input" 
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    alerts : state.setAlert
})

export default connect(mapStateToProps, {setAlert})(SignUpForm)