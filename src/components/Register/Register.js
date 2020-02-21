import React from 'react';


class Register extends React.Component {
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
        this.props.sendRegister(this.state.email, this.state.password);
    }

    render() {
        if (this.props.error) {
            var errorMessage = (
                <div className="alert alert-danger">
                    {this.props.error}
                </div>
            );
        } else {
            var errorMessage = (
                <div></div>
            );
        }
        return (
            <div className="container my-2">
                <h2>Register an account.</h2>
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" onChange={this.handleChange} type="email" className="form-control" />
                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
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


export default Register;