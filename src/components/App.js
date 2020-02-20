import React from 'react';
import { Router } from "react-router";
import { Route } from 'react-router-dom';
import history from '../history';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Works from './Works/Works';
import { loginAction, registerAction, getWorks } from '../util';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      works: []
    }
  }

  handleLogin(email, password) {
    loginAction(email, password)
      .then((result) => {
        console.log("Should push /works")
        history.push('/works')
        // isn't working for some reason maybe need to bind this
        // this.setState({
        //   authenticated: true
        // })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleRegister(email, password) {
    registerAction(email, password)
      .then((result) => {
        console.log("Should push /works")
        history.push('/works')
        // isn't working for some reason maybe need to bind this
        // this.setState({
        //   authenticated: true
        // })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getMyWorks = () => {
    let works = getWorks()
    console.log(works)
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar auth={this.state.authenticated} />
          <Route exact path="/" component={Home} />
          <Route 
            path="/register" 
            render={(props) => <Register {...props} sendRegister={this.handleRegister} /> }
          />
          <Route 
            path="/login" 
            render={(props) => <Login {...props} sendLogin={this.handleLogin} />} 
          />
          <Route 
            path="/works" 
            render={(props) => <Works {...props} data={this.state.works} fetchData={this.getMyWorks} />} 
          /> 
        </div>
      </Router>
    )
  }
}


export default App;
