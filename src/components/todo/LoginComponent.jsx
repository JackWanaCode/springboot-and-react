import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';


class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'jack',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        console.log([event.target.name], event.target.value)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        //jack, pw
        // if (this.state.username === "jack" && this.state.password === "pw") {
        //     console.log("Login successful")
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // } else {
        //     console.log("Invalid credentials")
        //     this.setState(
        //         {
        //             hasLoginFailed: true,
        //             showSuccessMessage: false
        //         }
        //     )
        // }

        AuthenticationService
        .executeBasicAuthenticationService(this.state.name, this.state.password)
        .then(() => {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(() => {
            this.setState(
                {
                    hasLoginFailed: true,
                    showSuccessMessage: false
                }
            )
        })

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.value} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent