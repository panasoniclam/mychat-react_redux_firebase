import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App.js';
import * as serviceWorker from './serviceWorker';
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import { compose, createStore } from 'redux'
import rootReducer from './reducers/rootReducer.js';
import { Provider } from 'react-redux'

var firebaseConfig = {
    apiKey: "AIzaSyD4Fu23ovqMtfcvNqZuO0J_QYWaCGV3EiE",
    authDomain: "chatweb-8c888.firebaseapp.com",
    databaseURL: "https://chatweb-8c888.firebaseio.com",
    projectId: "chatweb-8c888",
    storageBucket: "",
    messagingSenderId: "643563804995"
};

firebase.initializeApp(firebaseConfig);

const config = {
    userProfile: 'users',
    presence: 'presence',
    sessions: 'sessions' // firebase root where user profiles are stored
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, config)
)(createStore)

const initialState = {}

const store = createStoreWithFirebase(rootReducer, initialState)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
