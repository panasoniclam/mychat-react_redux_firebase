import React from 'react';
import { firebaseConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import iconGroupChat from '../../../resources/iconadd.png';
import iconAppChat from '../../../resources/iconapp.png';
import iconLogOut from '../../../resources/iconlogout.png';
// import ObjectID from 'bson-objectid';
// import { OrderedMap } from 'immutable';
// import lodash from 'lodash';
import '../../../styles/homepage/component-in-home/MenuBar.css';
import {withRouter} from "react-router-dom";


class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.onCreateChannel = this.onCreateChannel.bind(this);
        this.onLogoutApp = this.onLogoutApp.bind(this);
    }
    
    onCreateChannel() {
        // const { store } = this.props;
        // const channelId = new ObjectID().toString();

        // const currentUser = store.getCurrentUser;
        // const currentUserId = lodash.get(currentUser, '_id');
        // const updated = new Date();

        // const newChannel = {
        //     _id: channelId,
        //     title: "New Messenger",
        //     lastMessage: "",
        //     avatar: avatar,
        //     members: new OrderedMap(),
        //     messages: new OrderedMap(),
        //     isNew: true,
        //     userId: currentUserId,
        //     updated: updated.getTime(),
        //     created: new Date(),
        // }   

        // newChannel.members = newChannel.members.set(currentUserId, currentUser); 
        // store.onCreateNewChannel(newChannel);
    }

    onLogoutApp(){
        this.props.history.push('/');
            const uid = this.props.auth.uid;;
            var lastOnlineRef = this.props.firebase.database().ref('users/' + uid + '/lastOnline');
            var myConnectionsRef = this.props.firebase.database().ref('users/' + uid + '/connection');
            myConnectionsRef.set(false);
            lastOnlineRef.set(Firebase.database.ServerValue.TIMESTAMP);
            this.props.firebase.logout();
            this.props.history.push('/');
    }

    render() {
        console.log("menubar");
        const avatarUser = this.props.auth.photoURL;
        return (
            <div className="menu-bar">
                <div className="menus">
                    <div className="icon-app">
                        <img src={avatarUser} alt="avatar"/>
                    </div>

                    <div className="action-creategroup">
                        <img src={iconGroupChat} alt="avatar" onClick={this.onCreateChannel}/>
                    </div>

                    <div className="action-logout">
                        <img src={iconLogOut} alt="avatar"onClick={this.onLogoutApp}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({firebase: { auth } }) => ({ auth }))
)(withRouter(MenuBar))
