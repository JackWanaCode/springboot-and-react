import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
            return <Route to="/login"/>
        }
    }
}

export default AuthenticatedRoute