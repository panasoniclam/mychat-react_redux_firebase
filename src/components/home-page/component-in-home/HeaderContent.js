import React from 'react';
import '../../../styles/homepage/component-in-home/HeaderContent.css';
import avatar from '../../../resources/avatar.jpg';
import { connect } from 'react-redux';
import {channelAction} from '../../../actions/channelAction';
import star from '../../../resources/icon-star.png';
import starFull from '../../../resources/icon-star-full.png';
import { compose } from 'redux';
import { firebaseConnect} from 'react-redux-firebase';
import { throws } from 'assert';
class HeaderContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isStar: false,
        }
    }
    handlerClickStar = () => {
        var idStarChannel = this.props.firebase.database().ref('users/' + this.props.activeChannel.key + '/isStar');
        idStarChannel.set(true);
    }

    handlerClickSolidStar = () => {
        var idStarChannel = this.props.firebase.database().ref('users/' + this.props.activeChannel.key + '/isStar');
        idStarChannel.set(false);
    }

    render() {
        const activeChannel = this.props.activeChannel;
        var idStarChannel = this.props.firebase.database().ref('users/' + this.props.activeChannel.key + '/isStar');

        idStarChannel.on('value', (snapshot) => {
            if(snapshot.val() !== this.state.isStar){
                this.setState({
                    isStar: snapshot.val()
                })
            }
        })

        return (
            (activeChannel !== '' ? 
                <div className="header-content-active">      
                    <div className="profile-userchat-image-active">
                        <img src={activeChannel.value.avatarUrl} alt="avatar" />
                    </div>

                    <div className="profile-username-active">
                        <div>{activeChannel.value.displayName}</div>
                    </div>
                    {
                        this.state.isStar? 
                        <div className="star">
                            <img src={starFull} alt="star" onClick={this.handlerClickSolidStar}></img>
                        </div>
                        :
                        <div className="star">
                            <img src={star} alt="star" onClick={this.handlerClickStar}></img>
                        </div>
                    }           
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
    auth: state.firebase.auth,
})

const mapDispatchToProps = (dispatch) => ({
    actionsSetActiveChannel: (payload) => dispatch(channelAction.actionsSetActiveChannel(payload)),
});


export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps)
)(HeaderContent)
