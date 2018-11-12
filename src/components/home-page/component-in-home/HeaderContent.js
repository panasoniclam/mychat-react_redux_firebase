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

    setIdStarChannel = () => {
        var idStarChannel = this.props.firebase.database().ref('idchannelstar/' + this.props.auth.uid);
        idStarChannel.on('value', snapshot => {
            if(this.props.idStarChannel !== snapshot.val()){
                if(snapshot.val() && snapshot.val() !== ''){ 
                    var payload = {};
                    payload.idStarChannel = snapshot.val();
                    this.props.actionSetStarChannel(payload);
                }else{
                    var payload = {};
                    idStarChannel.set('');
                    payload.idStarChannel = '';
                    this.props.actionSetStarChannel(payload);
                }
            }   
        }) 
    }

    handlerClickStar = () => {
        var idStarChannel = this.props.firebase.database().ref('idchannelstar/' + this.props.auth.uid);
        idStarChannel.set(this.props.activeChannel.key);
    }

    handlerClickSolidStar = () => {
        var idStarChannel = this.props.firebase.database().ref('idchannelstar/' + this.props.auth.uid);
        idStarChannel.set('');
    }

    render() {
        const activeChannel = this.props.activeChannel;
        this.setIdStarChannel();

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
                        this.props.idStarChannel === activeChannel.key ? 
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
    idStarChannel: state.channelReducer.idStarChannel
})

const mapDispatchToProps = (dispatch) => ({
    actionsSetActiveChannel: (payload) => dispatch(channelAction.actionsSetActiveChannel(payload)),
    actionSetStarChannel: (payload) => dispatch(channelAction.actionSetStarChannel(payload))
});


export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps)
)(HeaderContent)
