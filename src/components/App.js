import React from 'react';
import { Router } from "react-router";
import { Route } from 'react-router-dom';
import history from '../history';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import WorkList from './WorkList/WorkList';
import Work from './Work/Work';
import { 
  loginAction, 
  logoutAction, 
  registerAction, 
  getWorks,
  makeWork,
  checkAuth,
  saveVersion,
  makeVersion,
  deleteVersion,
  deleteWork
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
      currNum: 1,
      texts: {
          one: '',
          two: ''
      },
      currNums: {
          one: 1,
          two: 2
      }
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

  deleteWork = (id) => {
    console.log("DELETE")
    deleteWork(id)
    .then(result => {
      let newWorks = this.state.works;
      newWorks = newWorks.filter(item => {
        return item.id != id
      })
      this.setState({
        works: newWorks
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  focusOnWork = (id) => {
    this.state.works.map((item) => {
      if (item.id == id) {
        this.setState({
          currWorkId: item.id,
          currTitle: item.title,
          currText: item.versions[0].text,
          currNum: 1,
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

  createVersion = (workId, versionNum) => {
    makeVersion(workId, versionNum)
      .then((result) => {
        console.log(result)
        this.setState({
          currNum: result.number,
          currText: result.text,
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
            render={(props) => <WorkList 
                                  {...props} 
                                  data={this.state.works} 
                                  fetchData={this.getMyWorks}
                                  addWork={this.createWork} 
                                  focusWork={this.focusOnWork}
                                  deleteWork={this.deleteWork} />} 
          /> 
          <Route 
            path="/version"
            render={(props) => <Work
                                  {...props}
                                  workId={this.state.currWorkId}
                                  title={this.state.currTitle}
                                  text={this.state.currText}
                                  currNum={this.state.currNum}
                                  versions={this.state.currVersions}
                                  sendSave={this.sendSave}
                                  createVersion={this.createVersion} 
                                  removeVersion={this.removeVersion}
                                  texts={this.state.texts}
                                  currNums={this.state.currNums}/>}
          />
        </div>
      </Router>
    )
  }
}


export default App;
