import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { BrowserRouter, Switch} from 'react-router-dom';
import LoginPage from '../components/login-page/LoginPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
