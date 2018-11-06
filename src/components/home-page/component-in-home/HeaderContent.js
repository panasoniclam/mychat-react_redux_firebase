import React from 'react';
import '../../../styles/homepage/component-in-home/HeaderContent.css';
import avatar from '../../../resources/avatar.jpg';


class HeaderContent extends React.Component {
    render() {
        console.log("Header contend");
        
        const channel = true;
        return (
            ((!channel) ?
                <div className="header-content">    
                    <div className="profile-userchat-image">
                        {!channel ? null : 
                        <img src={avatar} alt="avatar" />}
                    </div>
                    <div className="profile-username">
                        <div>Name channel</div>
                    </div>
                </div>
                :
                <div className="header-content-active">      
                    <div className="profile-userchat-image-active">
                        <img src={avatar} alt="avatar" />
                    </div>

                    <div className="profile-username-active">
                        <div>Name channel</div>
                    </div>
                </div>
            )
        )
    }
}
export default HeaderContent;
