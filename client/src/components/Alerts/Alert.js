import React, { Component } from 'react'


 class Alert extends Component {
    render() {
        return (
            <h4 className="Alert">
                {this.props.alertMessage}
            </h4>
        )
    }
}


export default Alert