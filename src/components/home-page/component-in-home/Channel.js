import React from 'react';
import classNames from 'classnames';
import '../../../styles/homepage/component-in-home/SiderbarLeft.css';
import { connect } from 'react-redux';
import {channelAction} from '../../../actions/channelAction';

class Channel extends React.Component{
    constructor(props){
        super(props);
        this.setIdActiveChannel = this.setIdActiveChannel.bind(this);
    }

    setIdActiveChannel(channel){
        let payload = {};
        payload.activeChannel = channel;
        this.props.actionsSetActiveChannel(payload);

    }

    render(){
        const {channel} = this.props;
        const activeChannel = this.props.activeChannel;
        const isOnline = channel.value.connection;
        
        return(
            <div onClick={() => {
                this.setIdActiveChannel(channel)
            }} key={channel.key} className={classNames('channel', { 'channel-active': activeChannel.key === channel.key })}>
                <div className="user-image">
                    <img src={channel.value.avatarUrl} alt="avatar" />
                    {
                        isOnline ? <span className='user-online'></span> : <span className='user-offline'></span>
                    }
                </div>
                    
                <div className="channel-info">
                    <div>{channel.value.displayName}</div>
                    {/* <p>{channel.lastMessage}</p> */}
                    <p>last message</p>

                </div>

                <div className="number-messagewait">
                    {/* {channel.numberOfMessageWait > 0 ? 
                        <p>{channel.numberOfMessageWait > 100 ? "99+" : channel.numberOfMessageWait}</p>
                        :
                        null
                    } */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    activeChannel: state.channelReducer.activeChannel
})

const mapDispatchToProps = (dispatch) => ({
    actionsSetActiveChannel: (payload) => dispatch(channelAction.actionsSetActiveChannel(payload)),
    
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Channel);
