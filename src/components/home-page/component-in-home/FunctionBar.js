import React, {Component} from 'react';
import '../../../styles/homepage/component-in-home/FunctionBar.css';
import imageUpload from '../../../resources/icons8-picture-50.png';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect} from 'react-redux-firebase';
import {channelAction} from '../../../actions/channelAction.js';
import {messageAction} from '../../../actions/messageAction.js';
import ReactLoading from "react-loading";
class FunctionBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            isLoading: false
        };
    }

    type = "spokes";

    fileChangedHandler = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    uploadHandler = (file) => { 
        var uploadImage = this.props.firebase.storage().ref('images/' + file.name).put(file);
        uploadImage.on('state_changed', function(snapshot){
        }, function(error){
        }, () => {
            uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) =>{
                this.handleSend(downloadURL);   
            });
        })   
        this.setState({
            file: '',
            isLoading: true
        })
    }

    handleSend = (newMessage) => {
        const activeChannel = this.props.activeChannel;
        const myId = this.props.auth.uid;
        const userChatId = this.props.activeChannel.key;

        if (newMessage && newMessage.trim().length > 0) {
            if(!activeChannel){
                let payload = {};
                payload.message = '';
                this.props.actionSetMessage(payload);
                this.setState({
                    isLoading: false
                })
                return;
            }

            const channelId = (myId < userChatId) ? myId + userChatId : userChatId + myId;
            var messages = this.props.firebase.database().ref('channels/' + channelId + '/messages');
            var lastMessage = this.props.firebase.database().ref('channels/' + channelId + '/lastMessage');

            messages.push({
                from: myId,
                to: userChatId,
                message: newMessage,
                createTime: new Date().getTime(),
            })

            lastMessage.set(newMessage);

            this.setState({
                file: '',
                isLoading: false
            })
        }else{
            let payload = {};
            payload.message = '';
            this.props.actionSetMessage(payload);
            return;
        }
    }

    render(){
        if(this.state.file !== ''){
            this.uploadHandler(this.state.file);
        }
        const loader =
        <div className="loader" key={0}>
            <ReactLoading type="spokes" color="black" height={25} width={25}/>
        </div>
        return(
            <div className="container-function-bar">
                <div className="button-upload-image">
                    {
                        this.state.isLoading ? 
                        <div>{loader}</div>
                        :
                        <img src={imageUpload} onClick={this.fileChangedHandler} alt=""></img>
                    }
                    <input className="input-file" type="file" value='' onChange={this.fileChangedHandler} accept="image/*"/>
                </div>
            </div>
        );
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
)(FunctionBar)
