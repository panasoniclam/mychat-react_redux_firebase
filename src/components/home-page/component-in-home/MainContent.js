import React from 'react';
import lodash from 'lodash';
import SearchUser from '../../home-page/component-in-home/SearchUser.js';
import '../../../styles/homepage/component-in-home/MainContent.css';
import {withRouter} from "react-router-dom";
import moment from 'moment';

const messagesChannel = [];

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.renderMessage = this.renderMessage.bind(this);
        this.scrollMessageToBottom = this.scrollMessageToBottom.bind(this);
    }

    renderMessage(message) {
        const tmp = message.body;
        const html = lodash.split(tmp, '\n').map((text, key) => {
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

    onLogoutApp(){
        this.props.history.push('/');
    }

    render() {
        console.log("Main content");
        const isLogOut = false;
        // const size = store.messages.size;
        if(isLogOut){
            this.onLogoutApp();
        }
        return (
            (false) ?
                <SearchUser></SearchUser>
                :
                <div ref={(refe) => { this.refMessage = refe }} className="messages">
                    {messagesChannel.map((message, index) => {
                        const userId = lodash.get(message, 'userId');
                        // const user = store.getUserInCache(userId);
                        const user = {};
                        return (
                            (message.me ? 
                            <div key={index} className="message-me">
                                <div className="message-body-me">
                                    <div className='message-text-me'>
                                        {this.renderMessage(message)}
                                    </div>
                                    <div className ="created-message">
                                        <div>{moment(message.created).format('MM/DD/YY, HH:mm')}</div>
                                    </div>
                                </div>
                                <div className="message-user-image">
                                    <img src={lodash.get(user, 'avatar')} alt="avatar" />
                                </div>
                            </div>
                            :
                            <div key={index} className="message">
                                <div className="message-user-image">
                                    <img src={lodash.get(user, 'avatar')} alt="avatar" />
                                </div>
                                <div className='message-body'>
                                    <div className='message-author'>
                                        {lodash.get(user,'name')}
                                    </div>
                                    <div className='message-text'>
                                        {this.renderMessage(message)}
                                    </div>
                                    <div className ="created-message">
                                        <div>{moment(message.created).format('MM/DD/YY, HH:mm')}</div>
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

export default withRouter(MainContent);
