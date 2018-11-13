import React from 'react';
import lodash from 'lodash';
import '../../../styles/homepage/component-in-home/MainContent.css';
import { connect } from 'react-redux';
import moment from 'moment';
import {channelAction} from '../../../actions/channelAction.js';
import { firebaseConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { messageAction } from '../../../actions/messageAction';
class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.renderMessage = this.renderMessage.bind(this);
        this.scrollMessageToBottom = this.scrollMessageToBottom.bind(this);
    }

    renderMessage(message) {
        const html = lodash.split(message, '\n').map((text, key) => {
            return <div key={key} dangerouslySetInnerHTML={{ __html: text }} />
        })
        return html;
    }

    scrollMessageToBottom() {
        if (this.refMessage) {
            this.refMessage.scrollTop = this.refMessage.scrollHeight;
        }
    }

    componentDidUpdate() {
        this.scrollMessageToBottom();
    }
    
    checkURLIsLinkImage = (url) => {
        var check ='';
        var res = url.split("\n");
        check = (res[0].match(/\.(jpeg|jpg|gif|png)$/) != null);
        if(url.indexOf("https://firebasestorage.googleapis.com/v0/b/chatweb-8c888.appspot.com/o/image") !== -1){
            check = true;
        }
        return check;
    }

    checkUploadImage = (url) => {
        if(url.indexOf("https://firebasestorage.googleapis.com/v0/b/chatweb-8c888.appspot.com/o/image") !== -1){
            return true;
        }
        return false;
    } 

    render() {
        const activeChannel = this.props.activeChannel;
        const myId = this.props.auth.uid;
        const userChatId = activeChannel.key;

        if(activeChannel){
            const channelId = (myId < userChatId) ? myId + userChatId : userChatId + myId;
            var messages = this.props.firebase.database().ref('channels/' + channelId + '/messages');

            messages.on('value', snapshot => {
                if(snapshot.val()){
                    var listMessages = lodash.values(snapshot.val());
                    if((listMessages.length !== this.props.listMessages.length && listMessages.lenght !== 0) ||
                        (listMessages[0].to !== this.props.listMessages[0].to)){
                        let payload = {};
                        payload.listMessages = listMessages;
                        this.props.actionSetListMessages(payload);
                    }                    
                }else{
                    if(this.props.listMessages.length !== 0){
                        let payload = {};
                        payload.listMessages = [];
                        this.props.actionSetListMessages(payload);
                    }   
                }
            })
        }

        return (
            
            <div ref={(refe) => { this.refMessage = refe }} className="messages">
                {this.props.listMessages.map((message, index) => {
                    var isMe = false;
                    
                    if(message.from === this.props.auth.uid){
                        isMe = true;
                    }
                    return (
                        (isMe ? 
                            <div key={index} className="message-me">
                                <div className="message-body-me">
                                    {
                                        this.checkURLIsLinkImage(message.message) ? 
                                            <div className="message-image">
                                                {
                                                    this.checkUploadImage(message.message) ?
                                                    <img src={message.message} alt="avatar"></img>
                                                    :
                                                    <div>
                                                        <div className='link-image'>{message.message}</div>
                                                        <img src={message.message} alt="avatar"></img>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <div className="message-text-me">
                                                {this.renderMessage(message.message)}
                                            </div>
                                    }
                                    <div className ="created-message">
                                        <div>{moment(message.createTime).format('MM/DD/YY, HH:mm')}</div>
                                    </div>
                                </div>
                                <div className="message-user-image">
                                    {   
                                        (index === 0 || (index > 0 && message.from !== this.props.listMessages[index - 1].from)) ?
                                            <img src={this.props.auth.photoURL} alt="avatar" />
                                            :
                                            <div className="no-image"/>
                                    }
                                </div>
                            </div>
                            :
                            <div key={index} className="message">
                                <div className="message-user-image">
                                    {   
                                        (index === 0 || (index > 0 && message.from !== this.props.listMessages[index - 1].from)) ?
                                            <img src={activeChannel.value.avatarUrl} alt="avatar" />
                                            :
                                            <div className="no-image"/>
                                    }
                                </div>
                                <div className='message-body'>
                                    <div className='message-author'>
                                        {activeChannel.value.displayName}
                                    </div>
                                    {
                                        this.checkURLIsLinkImage(message.message) ? 
                                            <div className="message-image">
                                                <img src={message.message} alt="avatar"></img>
                                            </div>
                                            :
                                            <div className="message-text-me">
                                                {this.renderMessage(message.message)}
                                            </div>
                                    }
                                    <div className ="created-message">
                                        <div>{moment(message.createTime).format('MM/DD/YY, HH:mm')}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    );
                })}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    activeChannel: state.channelReducer.activeChannel,
    listMessages: state.messageReducer.listMessages,
    auth: state.firebase.auth,
})

const mapDispatchToProps = (dispatch) => ({
    actionsSetActiveChannel: (payload) => dispatch(channelAction.actionsSetActiveChannel(payload)),
    actionSetListMessages: (payload) => dispatch(messageAction.actionSetListMessages(payload))
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps)
)(MainContent)
