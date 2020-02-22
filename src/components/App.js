import React from 'react';
import { Router } from "react-router";
import { Route } from 'react-router-dom';
import history from '../history';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Works from './Works/Works';
import Version from './Version/Version';
import { 
  loginAction, 
  logoutAction, 
  registerAction, 
  getWorks,
  makeWork,
  checkAuth
} from '../util';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      works: [],
      error: null,
      temp_version_data: {
        title: "Untitled",
        text: "This is a test"
      },
      focusWork: null
    }

  }

  componentDidMount() {
    checkAuth()
    .then((result) => {
      console.log("RESULT")
      console.log(result)
      if (result) {
        this.setState({
          authenticated: true
        })
      }
    })
    .catch((error) => {
      console.log("ERROR CEHCK")
      console.log(error)
    })
  }

  handleLogin = (email, password) => {
    loginAction(email, password)
      .then((result) => {
        console.log("Should push /works")
        history.push('/works')
        // isn't working for some reason maybe need to bind this
        this.setState({
          authenticated: true
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          error: error
        })
      })
  }

  handleLogout = () => {
    logoutAction()
    this.setState({
      authenticated: false
    })
    history.push('/login')
  }

  handleRegister = (email, password) => {
    registerAction(email, password)
      .then((result) => {
        console.log("Should push /works")
        history.push('/works')
        // isn't working for some reason maybe need to bind this
        this.setState({
          authenticated: true
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          error: error
        })
      })
  }

  getMyWorks = () => {
    getWorks()
      .then((data) => {
        this.setState({
          works: data,
          authenticated: true
        })
      })
      .catch((error) => {
        console.log("ERROR")
      })
  }

  createWork = () => {
    makeWork()
      .then((data) => {
        const newWorks = this.state.works 
        newWorks.push(data)
        this.setState({
          works: newWorks
        })
      })
      .catch((error) => {
        console.log("ERROR MAKING WORK")
      })
  }

  focusOnWork = (id) => {
    this.state.works.map((item) => {
      if (item.id == id) {
        this.setState({
          focusWork: item
        })
        history.push('/version') 
      }
    })
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar auth={this.state.authenticated} signalLogout={this.handleLogout} />
          <Route exact path="/" component={Home} />
          <Route 
            path="/register" 
            render={(props) => <Register {...props} sendRegister={this.handleRegister} error={this.state.error} /> }
          />
          <Route 
            path="/login" 
            render={(props) => <Login {...props} sendLogin={this.handleLogin} error={this.state.error} />} 
          />
          <Route 
            path="/works" 
            render={(props) => <Works 
                                  {...props} 
                                  data={this.state.works} 
                                  fetchData={this.getMyWorks}
                                  addWork={this.createWork} 
                                  focusWork={this.focusOnWork} />} 
          /> 
          <Route 
            path="/version"
            render={(props) => <Version 
                                  {...props}
                                  data={this.state.focusWork} />}
          />
        </div>
      </Router>
    )
  }
}


export default App;
