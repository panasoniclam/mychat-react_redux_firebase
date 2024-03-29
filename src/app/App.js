import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { BrowserRouter, Switch} from 'react-router-dom';
import LoginPage from '../components/login-page/LoginPage.js'
import Home from '../components/home-page/Home.js';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/home" component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
