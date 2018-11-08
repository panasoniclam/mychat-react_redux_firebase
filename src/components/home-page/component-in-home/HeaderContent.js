import React from 'react';
import '../../../styles/homepage/component-in-home/HeaderContent.css';
import avatar from '../../../resources/avatar.jpg';
import { connect } from 'react-redux';
import {channelAction} from '../../../actions/channelAction';


class HeaderContent extends React.Component {
    render() {
        const activeChannel = this.props.activeChannel;
        // const isOnline = channel.connection;

        return (
            (activeChannel !== '' ? 
                <div className="header-content-active">      
                    <div className="profile-userchat-image-active">
                        <img src={activeChannel.value.avatarUrl} alt="avatar" />
                    </div>

                    <div className="profile-username-active">
                        <div>{activeChannel.value.displayName}</div>
                    </div>
                </div>
                :
                <div className="header-content">    
                    <div className="profile-userchat-image">
                        {!activeChannel ? null : 
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
