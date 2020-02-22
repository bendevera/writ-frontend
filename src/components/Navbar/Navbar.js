import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = (props) => {
    if (props.auth) {
        return (
            <nav className="navbar navbar-light bg-light justify-content-between">
                <Link to="/"><span className="navbar-brand mb-0 h1">writ</span></Link>
                <div className="row">
                    <Link to="/works"><span className="nav-link">Works</span></Link>
                    <span className="nav-link" onClick={props.signalLogout}>Logout</span>
                </div>
            </nav>
        )
    }
    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <Link to="/"><span className="navbar-brand mb-0 h1">writ</span></Link>
            <div className="row">
                <Link to="/login"><span className="nav-link">Login</span></Link>
                <Link to="/register"><span className="nav-link">Register</span></Link>
            </div>
        </nav>
    )
}

export default Navbar;