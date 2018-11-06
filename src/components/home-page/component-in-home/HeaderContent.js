import React from 'react';
import '../../../styles/homepage/component-in-home/HeaderContent.css';
import avatar from '../../../resources/avatar.jpg';
import { connect } from 'react-redux';
import {channelAction} from '../../../actions/channelAction';


class HeaderContent extends React.Component {
    render() {
        console.log("Header contend");
        const channel = this.props.activeChannel;
        // const isOnline = channel.connection;

        return (
            (channel !== '' ? 
                <div className="header-content-active">      
                    <div className="profile-userchat-image-active">
                        <img src={channel.value.avatarUrl} alt="avatar" />
                        {/* {
                            isOnline ? <span className='user-online'></span> : <span className='user-offline'></span>
                        } */}
                    </div>

                    <div className="profile-username-active">
                        <div>{channel.value.displayName}</div>
                    </div>
                </div>
                :
                <div className="header-content">    
                    <div className="profile-userchat-image">
                        {!channel ? null : 
                        <img src={avatar} alt="avatar" />}
                    </div>
                </div>
            )   
        )
    }
}

const mapStateToProps = (state) => ({
    activeChannel: state.channelReducer.activeChannel,
})

const mapDispatchToProps = (dispatch) => ({
    actionsSetActiveChannel: (payload) => dispatch(channelAction.actionsSetActiveChannel(payload)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContent);
