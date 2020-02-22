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
  checkAuth,
  saveVersion,
  makeVersion,
  deleteVersion
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
      currWorkId: null,
      currTitle: '',
      currText: '',
      currVersions: [],
      currNum: 1
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

  // componentDidUpdate(prevProps) {
  //   console.log("UPDATE")
  //   console.log(prevProps)
  //   console.log(this.props)
  // }

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
          currWorkId: item.id,
          currTitle: item.title,
          currText: item.versions[0].text,
          currNum: item.versions[0].number,
          currVersions: item.versions
        })
        history.push('/version') 
      }
    })
  }

  sendSave = (data) => {
    saveVersion(data)
      .then((result) => {
        console.log("RESULT OF SAVE")
        console.log(result)
      })
  }

  createVersion = (workId) => {
    makeVersion(workId)
      .then((result) => {
        console.log(result)
        this.setState({
          currNum: result.number,
          currVersions: [...this.state.currVersions, result]
        })
      })
  }

  removeVersion = (workId, number) => {
    deleteVersion(workId, number)
      .then((result) => {
        console.log("DELETED")
        console.log(result)
      })
      .catch((error) => {
        console.log("ERROR DELETING")
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
                                  workId={this.state.currWorkId}
                                  title={this.state.currTitle}
                                  text={this.state.currText}
                                  number={this.state.currNum}
                                  versions={this.state.currVersions}
                                  sendSave={this.sendSave}
                                  createVersion={this.createVersion} 
                                  removeVersion={this.removeVersion}/>}
          />
        </div>
      </Router>
    )
  }
}


export default App;
