import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import manageUsersReducer from './manageUsersReducer.js';
import channelReducer from './channelReducer.js';
import messageReducer from './messageReducer.js';
// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    manageUsersReducer,
    channelReducer,
    messageReducer
})

export default rootReducer;
