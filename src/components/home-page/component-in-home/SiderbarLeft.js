import React from 'react';
import Channel from '../../home-page/component-in-home/Channel.js';
import '../../../styles/homepage/component-in-home/SiderbarLeft.css';

const channels = [];

class SiderbarLeft extends React.Component {
    render() {
        console.log("siderbar-left")
        return (
            <div className="siderbar-left">
                <div className="title-member">Messenger </div>
                <div className="channels">
                    {channels.map((channel, index) => {
                        return (
                            <Channel key={index} channel={channel}></Channel>
                        );
                    })}
                </div>
            </div>
        )
    }
}
export default SiderbarLeft;
