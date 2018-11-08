import React from 'react';
import { withRouter } from "react-router-dom"
import { firebaseConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import '../../../styles/homepage/component-in-home/HeaderLeft.css';
import { manageUsersAction } from '../../../actions/manageUsersAction';
import { channelAction } from '../../../actions/channelAction';

class HeaderLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameSearch: ''
        }
    }

    handleSearch = () => {
        const userNameSearch = this.state.userNameSearch;
        const channels = this.props.users;

        var channel =  channels.find((channel) => channel.value.displayName === userNameSearch);
    
        if(channel){
            let payload = {};
            payload.activeChannel = channel;
            this.props.actionsSetActiveChannel(payload);
        }
    }

    handleChange = (event) => {
        this.setState({
            userNameSearch: event.target.value
        })
    }

    render() {
        return (
            <div className="header-left">
                <div className="name-user">
                    {"Smilo - " + this.props.auth.displayName}
                </div>
                <div className="search">
                    <div className="input-search">
                        <input onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                        this.handleSearch();
                                    }
                                }}                     
                                onChange={this.handleChange}
                                value={this.state.userNameSearch} placeholder="Search messager..."
                            />
                    </div>
                    <div className="action-search">
                        <button onClick={this.handleSearch}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    users: state.firebase.ordered.users
})

const mapDispatchToProps = (dispatch) => ({
    actionUpdateListUser: (payload) => dispatch(manageUsersAction.actionUpdateListUser(payload)),
    actionsSetActiveChannel: (payload) => dispatch(channelAction.actionsSetActiveChannel(payload)),
});

export default compose(
    firebaseConnect((props) => [
        { path: '/users' }
    ]), 
    connect(mapStateToProps, mapDispatchToProps)
)(HeaderLeft)
