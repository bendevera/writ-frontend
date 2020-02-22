import React from 'react';


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendLogin(this.state.email, this.state.password);
    }

    render() {
        var errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="alert alert-danger">
                    {this.props.error}
                </div>
            );
        } else {
            errorMessage = (
                <div></div>
            );
        }
        return (
            <div className="container my-2">
                <h2>Login to your account.</h2>
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" onChange={this.handleChange} type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" onChange={this.handleChange} type="password" className="form-control" />
                    </div>
                    {errorMessage}
                    <button className="btn btn-outline-dark" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}


export default Login;