import React, {Component} from 'react';
import '../../styles/loginpage.css'
import firebase from 'firebase';

const widthWindow = window.innerWidth
const heightWindow = window.innerHeight
const auth = firebase.auth;
var provider = new firebase.auth.GoogleAuthProvider();

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.LoginWithGoogle=this.LoginWithGoogle.bind(this);
    }

    LoginWithGoogle = () =>{
        // auth.signInWithPopup(provider);
    }
    
    render() {
        return ( 
            <div className="container-loginpage" style={{"width": widthWindow, "height":heightWindow}}>
                <div className="main" >
                    <div className="title-login">
                        Login
                    </div>
                    <div className="btn-login">
                        <button class="btn-login-google" onClick={this.LoginWithGoogle}>
                            Sign in Google
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
