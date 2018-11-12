import React from 'react';
import Channel from '../../home-page/component-in-home/Channel.js';
import '../../../styles/homepage/component-in-home/SiderbarLeft.css';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {manageUsersAction} from '../../../actions/manageUsersAction.js';
import lodash from 'lodash';
import ReactLoading from "react-loading";
class SiderbarLeft extends React.Component {
    type = "spokes";
    render() {
        var channels = [];
        const loader =
        <div className="loader" key={0}>
            <ReactLoading type="spokes" color="black" height={25} width={25}/>
        </div>

        const auth = this.props.auth;
        if(auth.isLoaded && !auth.isEmpty){
            var channelsTmp = this.props.users;
            channels = lodash.sortBy(channelsTmp, value => value.lastOnline);
        }
        
        const idStarChannel = this.props.idStarChannel;

        if(idStarChannel !== ''){
            var channelTmp = '';
            var indexChannel = '';

            channels.forEach((channel, index) => {
                if(channel.key === idStarChannel){
                    if(channel.value.connection){
                        indexChannel = index;
                        channelTmp = channel;
                        
                    }
                }
            })

            if(channelTmp !== ''){
                channels.splice(indexChannel, 1);
                channels.unshift(channelTmp);
            }
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
                        <div>{loader}</div>
                    </div>
                </div>
            )
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    users: state.firebase.ordered.users,
    idStarChannel: state.channelReducer.idStarChannel
})

const mapDispatchToProps = (dispatch) => ({
    actionUpdateListUser: (payload) => dispatch(manageUsersAction.actionUpdateListUser(payload)),
});

export default compose(
    firebaseConnect((props) => [
        { path: '/users' } // string equivalent 'todos'
    ]), // withFirebase can also be used
    connect(mapStateToProps, mapDispatchToProps)
)(SiderbarLeft)
