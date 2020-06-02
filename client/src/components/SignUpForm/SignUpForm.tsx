import React, { Component, ChangeEvent } from 'react'
import axios from "axios"


interface IState {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}



 class SignUpForm extends Component<{}, any>  {

    constructor(props : {}){
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    }



    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        this.setState({
            [name] : value
        })
        
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const userInfo = {
            firstName : this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        axios.post(`/api/auth/signup`, userInfo)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })

        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        })

        e.preventDefault();

    }

    render() {
        return (
            <div>
                <h1>Sign up</h1>
                <form action="" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        required 
                        name="firstName" 
                        onChange={this.handleChange}
                        value={this.state.firstName}
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        required 
                        name="lastName" 
                        onChange={this.handleChange}
                        value={this.state.lastName}
                    />
                    <input 
                        type="text" 
                        placeholder="Email" 
                        required 
                        name="email" 
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                     <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        name="password" 
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}


export default SignUpForm 