import React from 'react';
import Channel from '../../home-page/component-in-home/Channel.js';
import '../../../styles/homepage/component-in-home/SiderbarLeft.css';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {manageUsersAction} from '../../../actions/manageUsersAction.js';

class SiderbarLeft extends React.Component {
    
    render() {
        var channels = [];
        const auth = this.props.auth;
        if(auth.isLoaded && !auth.isEmpty){
            channels = this.props.users;
        }
    
        return (
            ((isLoaded(this.props.users) && !isEmpty(this.props.users)) ?
                <div className="siderbar-left">
                    <div className="title-member">Messenger </div>
                    <div className="channels">
                        {
                            channels.map((channel, index) => {
                                if(channel.key !== auth.uid){
                                    return (
                                        <Channel key={index} channel={channel}></Channel>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
                :
                <div className="siderbar-left">
                    <div className="title-member">Messenger </div>
                    <div className="channels">
                        <div>Loading...</div>
                    </div>
                </div>
            )
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    actionUpdateListUser: (payload) => dispatch(manageUsersAction.actionUpdateListUser(payload)),
});

export default compose(
    firebaseConnect((props) => [
        { path: '/users' } // string equivalent 'todos'
    ]), // withFirebase can also be used
    connect(({firebase: { auth, ordered}}) => ({ auth, users: ordered.users}), mapDispatchToProps)
)(SiderbarLeft)
