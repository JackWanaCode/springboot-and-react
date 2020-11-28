import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';


class HeaderComponent extends Component {
    render() {
        
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://github.com/JackWanaCode" className="navbar-brand">jack</a></div>
                    <ul className="navbar-nav">
                        {
                            isUserLoggedIn && 
                            <li className="nav-link"><Link className="nav-link" to="/welcome/jack">Home</Link></li>
                        }
                        {
                            isUserLoggedIn &&
                            <li className="nav-link"><Link className="nav-link" to="/todos">Todos</Link></li>
                        }   
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {
                            !isUserLoggedIn &&
                            <li className="nav-link"><Link className="nav-link" to="/login">Login</Link></li>
                        }
                        {
                            isUserLoggedIn &&
                            <li className="nav-link"><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>
                        }
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);