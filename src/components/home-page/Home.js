import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { firebaseConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

import HeaderLeft from '../../components/home-page/component-in-home/HeaderLeft.js';
import HeaderContent from '../../components/home-page/component-in-home/HeaderContent.js';
import SiderbarLeft from '../../components/home-page/component-in-home/SiderbarLeft.js';
import MenuBar from '../../components/home-page/component-in-home/MenuBar.js';
import MainContent from '../../components/home-page/component-in-home/MainContent.js';
import MessageInput from '../../components/home-page/component-in-home/MessageInput.js';
import FuntionBar from '../../components/home-page/component-in-home/FunctionBar.js'
import Firebase from 'firebase';
import '../../styles/homepage/Home.css'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            height: window.innerHeight,
        }
        this.onResize = this.onResize.bind(this);
    }


    setStateLogin = () => {
        const auth = this.props.auth;
        if(auth.isLoaded && !auth.isEmpty){
            this.props.firebase.auth().onAuthStateChanged(
                (user) => {
                    if (user) {
                        const uid = user.uid;;
                        var lastOnlineRef = this.props.firebase.database().ref('users/' + uid + '/lastOnline');
                        var myConnectionsRef = this.props.firebase.database().ref('users/' + uid + '/connection');
                        var lastTimeMessage = this.props.firebase.database().ref('users/' + uid + '/lastTimeMessage');

                        var connectedRef = this.props.firebase.database().ref('.info/connected');
                        connectedRef.on('value', (snapshot) => {
                            if(snapshot.val()){
                                lastTimeMessage.set(0);
                                myConnectionsRef.onDisconnect().set(false);
                                lastOnlineRef.onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP);

                                lastOnlineRef.set(Firebase.database.ServerValue.TIMESTAMP);
                                myConnectionsRef.set(true);

                            }
                        })

                    }
                }
            );
        } 
    }

    onResize(){
        this.setState({
            height: window.innerHeight,
        })
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.onresize);
        this.setStateLogin();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    componentDidUpdate(){
        this.setStateLogin();
    }

    render(){
        const { height } = this.state;
        const style = {
            height:height,
        }
        
        return(
            <div style={style} className="app-message">
                {/*-------------------------------------------MENU---------------------------------*/}
                <MenuBar></MenuBar>
                <div className="app-wrapper">
                    <div className="header-message">
                        <HeaderLeft></HeaderLeft>
                        <HeaderContent></HeaderContent>
                    </div>
                    {/* ---------------------------------------MAIN----------------------------------- */}
                    <div className="main-message">
                        <SiderbarLeft></SiderbarLeft>
                        <div className="main-content">
                            <MainContent></MainContent>        
                            <FuntionBar></FuntionBar>          
                            <MessageInput></MessageInput>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({firebase: { auth } }) => ({ auth }))
)(withRouter(Home))
