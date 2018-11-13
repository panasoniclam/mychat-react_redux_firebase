
import React from 'react';
import '../../../styles/homepage/component-in-home/SearchUser.css';
import '../../../styles/homepage/component-in-home/MessageInput.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect} from 'react-redux-firebase';
import {channelAction} from '../../../actions/channelAction.js';
import {messageAction} from '../../../actions/messageAction.js';
import Firebase from 'firebase';
class MessageInput extends React.Component {
    handleChange = (event) => {
        let payload = {};
        payload.message = event.target.value;
        this.props.actionSetMessage(payload);
    }

    handleSend = () => {
        const activeChannel = this.props.activeChannel;
        const myId = this.props.auth.uid;
        const userChatId = this.props.activeChannel.key;
        const newMessage = this.props.message;

        if (newMessage && newMessage.trim().length > 0) {
            if(!activeChannel){
                let payload = {};
                payload.message = '';
                this.props.actionSetMessage(payload);
                return;
            }

            const channelId = (myId < userChatId) ? myId + userChatId : userChatId + myId;
            var messages = this.props.firebase.database().ref('channels/' + channelId + '/messages');
            var lastMessage = this.props.firebase.database().ref('channels/' + channelId + '/lastMessage');
            var lastTimeMessage = this.props.firebase.database().ref('users/' + userChatId + '/lastTimeMessage');

            messages.push({
                from: myId,
                to: userChatId,
                message: newMessage,
                createTime: new Date().getTime(),
            })

            lastMessage.set(newMessage);
            lastTimeMessage.set(Firebase.database.ServerValue.TIMESTAMP);
            console.log(1);

            let payload = {};
            payload.message = '';
            this.props.actionSetMessage(payload);
        }else{
            let payload = {};
            payload.message = '';
            this.props.actionSetMessage(payload);
            return;
        }
    }
    
    render() {
        return (
            <div className="message-input">
                <div className="text-input">
                    <textarea onKeyUp={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            this.handleSend();
                        }
                    }}
                    value={this.props.message} onChange={this.handleChange}  placeholder="Write your message..." />
                </div>

                <div className="action-send">
                    <button onClick={this.handleSend} className="send">Send</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    activeChannel: state.channelReducer.activeChannel,
    message: state.messageReducer.message,
    auth: state.firebase.auth,
    users: state.firebase.ordered.users,
})

const mapDispatchToProps = (dispatch) => ({
    actionsSetActiveChannel: (payload) => dispatch(channelAction.actionsSetActiveChannel(payload)),
    actionSetMessage: (payload) => dispatch(messageAction.actionSetMessage(payload))
});

export default compose(
    firebaseConnect((props) => [{ path: '/users' }]),
    connect(mapStateToProps, mapDispatchToProps)
)(MessageInput)
