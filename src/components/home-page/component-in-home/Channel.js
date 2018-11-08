import React from 'react';
import classNames from 'classnames';
import '../../../styles/homepage/component-in-home/SiderbarLeft.css';
import { connect } from 'react-redux';
import {channelAction} from '../../../actions/channelAction';
import { firebaseConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { messageAction } from '../../../actions/messageAction';


class Channel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lastMessage: ''
        }
    }

    setActiveChannel = (channel) => {
        let payload = {};
        payload.activeChannel = channel;
        this.props.actionsSetActiveChannel(payload);

    }

    render(){
        const {channel} = this.props;
        const activeChannel = this.props.activeChannel;
        const isOnline = channel.value.connection;

        const myId = this.props.auth.uid;
        const userChatId = activeChannel.key;
        const channelId = (myId < userChatId) ? myId + userChatId : userChatId + myId;

        var lastMessage = this.props.firebase.database().ref('channels/' + channelId + '/lastMessage');
        
        lastMessage.on('value', snapshot => {
            if(this.state.lastMessage !== snapshot.val() && activeChannel.key === channel.key){
                this.setState({
                    lastMessage: snapshot.val()
                })
            }
        })

        console.log(this.state.lastMessage);
        
        return(
            <div onClick={() => {
                this.setActiveChannel(channel)
            }} key={channel.key} className={classNames('channel', { 'channel-active': activeChannel.key === channel.key })}>
                <div className="user-image">
                    <img src={channel.value.avatarUrl} alt="avatar" />
                    {
                        isOnline ? <span className='user-online'></span> : <span className='user-offline'></span>
                    }
                </div>
                <div className="channel-info">
                    <div>{channel.value.displayName}</div>
                    <p>{this.state.lastMessage}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    activeChannel: state.channelReducer.activeChannel,
    listMessages: state.messageReducer.listMessages,
    auth: state.firebase.auth
})

const mapDispatchToProps = (dispatch) => ({
    actionsSetActiveChannel: (payload) => dispatch(channelAction.actionsSetActiveChannel(payload)),
    actionSetListMessages: (payload) => dispatch(messageAction.actionSetListMessages(payload))
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps)
)(Channel)
