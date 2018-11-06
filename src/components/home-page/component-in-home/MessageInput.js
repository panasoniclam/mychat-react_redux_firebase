
import React from 'react';
import '../../../styles/homepage/component-in-home/SearchUser.css';
import '../../../styles/homepage/component-in-home/MessageInput.css';
import ObjectId from 'bson-objectid';
import Lodash from 'lodash'

class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend() {
        const newMessage = {};
        
        if (newMessage && newMessage.trim().length > 0) {
            const messageId = new ObjectId().toString();
            const channel = {};
            if(!channel || channel.title === "New Messenger"){
                return;
            }
            
            const user = {};

            const message = {
                id: messageId,
                channelId: channel.id,
                body: newMessage,
                userId: Lodash.get(user, 'id'),
                me: true,
            };    
            // store.addMessage(message);
            // store.setNewMessage('');
        }
    }

    render() {
        console.log("message input");

        return (
            <div className="message-input">
                <div className="text-input">
                    <textarea onKeyUp={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            this.handleSend();
                        }
                    }}
                        onChange={(event) => {
                            // store.setNewMessage(event.target.value);
                        }} value={''} placeholder="Write your message..." />
                </div>

                <div className="action-send">
                    <button onClick={this.handleSend} className="send">Send</button>
                </div>
            </div>
        )
    }
}

export default MessageInput;
