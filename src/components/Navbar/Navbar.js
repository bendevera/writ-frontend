import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = (props) => {
    const buttonText = props.auth ? "Logout" : "Login";
    const buttonPath = props.auth ? "/logout" : "/login";
    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <Link to="/"><span className="navbar-brand mb-0 h1">writ</span></Link>
            <Link to={buttonPath}><button className="btn btn-outline-dark">{buttonText}</button></Link>
        </nav>
    )
}

export default Navbar;