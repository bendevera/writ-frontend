import React from 'react';
import {Link} from 'react-router-dom';

const Home = (props) => {
    return (
        <div className="fluid-container">
            <div className="jumbotron my-jumbo">
                <h1 className="display-4">Welcome to writ.</h1>
                <p className="lead">We're a version control system for literary works.</p>
                <hr className="my-4" />
                <p>Sign up, and get to writing freely and cleanly.</p>
                <Link className="btn btn-outline-dark btn-lg" to="/register">Register</Link>
            </div>
        </div>
    )
}


export default Home;