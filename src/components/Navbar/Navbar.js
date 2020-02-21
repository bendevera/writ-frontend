import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = (props) => {
    if (props.auth) {
        return (
            <nav className="navbar navbar-light bg-light justify-content-between">
                <Link to="/"><span className="navbar-brand mb-0 h1">writ</span></Link>
                <div className="row">
                    <Link to="/works"><button className="btn btn-outline-dark mx-2">Works</button></Link>
                    <button className="btn btn-outline-dark" onClick={props.signalLogout}>Logout</button>
                </div>
            </nav>
        )
    }
    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <Link to="/"><span className="navbar-brand mb-0 h1">writ</span></Link>
            <Link to="/login"><button className="btn btn-outline-dark">Login</button></Link>
        </nav>
    )
}

export default Navbar;