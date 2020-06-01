import React, { Component, ChangeEvent } from 'react'



interface IState {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

 class SignUpForm extends Component<{}, IState>  {

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
        const {name, value}: {name: keyof IState, value: string} = e.target
        console.log(name)
        console.log(value)
    }

    render() {
        return (
            <div>
                <h1>Sign up</h1>
                <form action="">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        required 
                        name="firstName" 
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                    <input type="text" placeholder="Last Name" required/>
                    <input type="text" placeholder="Email" required/>
                    <input type="text" placeholder="Password" required/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}


export default SignUpForm 