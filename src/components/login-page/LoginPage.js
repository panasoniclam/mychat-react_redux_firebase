import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group'; // ES6
import '../../styles/login-page/LoginPage.css';     
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect} from 'react-redux-firebase'
import Firebase from 'firebase';

const widthWindow = window.innerWidth
const heightWindow = window.innerHeight
class LoginPage extends Component {

    goToPageHome = () => {
        this.props.history.push('/home');
    }

    setStateLogin = () => {
        const auth = this.props.auth;
        if(auth.isLoaded && !auth.isEmpty){
            this.props.firebase.auth().onAuthStateChanged(
                (user) => {
                    if (user) {
                        this.goToPageHome();
                    }
                }
            );
        } 
    }

    handleLogin = () => {
        this.props.firebase.login({ provider: 'google', type: 'popup' });
        // this.setStateLogin();
    }

    componentDidMount(){
        this.setStateLogin();
    }

    componentDidUpdate(){
        this.setStateLogin();
    }

    render() {
        return ( 
            <div className="container-loginpage" style={{"width": widthWindow, "height":heightWindow}}>
                <CSSTransitionGroup 
                transitionName="aminMoveDown"
                transitionAppear={true}
                transitionAppearTimeout={800}
                transitionEnterTimeout={0}
                transitionLeaveTimeout={300}>
                <div className="main" >
                    <CSSTransitionGroup 
                        transitionName="aminAppear"
                        transitionAppear={true}
                        transitionAppearTimeout={800}
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={300}>
                        <h1 className="title-login">Signin</h1>
                    </CSSTransitionGroup>
                    <div className="btn-login-wrapper">
                        <button className="btn-login-google"onClick={this.handleLogin}>
                            Sign in Google
                        </button>
                    </div>
                </div>
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({firebase: { auth} }) => ({ auth}))
)(LoginPage)
