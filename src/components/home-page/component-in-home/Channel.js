import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import '../../../styles/homepage/component-in-home/SiderbarLeft.css';
import iconcancel from '../../../resources/iconcancel.png';

class Channel extends React.Component{
    constructor(props){
        super(props);
        this.cancelChannel = this.cancelChannel.bind(this);
    }

    cancelChannel(){

    }

    render(){
        const {channel} = this.props;
        const currenntMessage = "Curent message";
        const nameUserChat = {};
        const activeChannel = {};
        return(
            <div onClick={() => {
                const idChannelActive = 1;
            }} key={channel._id} className={classNames('channel', { 'channel-active': lodash.get(activeChannel, 'id') === channel.id })}>
                <div className="user-image">
                    <img src={channel.avatar} alt="avatar" />
                </div>
                    
                <div className="channel-info">
                    <div>{channel.title}</div>
                    <p>{channel.lastMessage}</p>
                </div>

                <div className="number-messagewait">
                    {/* {channel.numberOfMessageWait > 0 ? 
                        <p>{channel.numberOfMessageWait > 100 ? "99+" : channel.numberOfMessageWait}</p>
                        :
                        null
                    } */}
                </div>
                <div>
                    {channel.isNew ? 
                    <div className='cancel'>
                        <img src={iconcancel} alt="avatar" onClick={this.cancelChannel}/>
                    </div>
                    :
                    null}
                </div>
            </div>
        )
    }
}

export default Channel;
