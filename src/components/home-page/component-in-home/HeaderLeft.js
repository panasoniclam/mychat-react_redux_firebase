import React from 'react';
import { withRouter } from "react-router-dom"
import { firebaseConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import '../../../styles/homepage/component-in-home/HeaderLeft.css';

class HeaderLeft extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch() {
        // const { store } = this.props;
        // if (store.getNameUserSearch && store.getNameUserSearch.trim().length > 0) {
        //     store.setShowComponentSearch(true);
        //     store.searchNameUserChat().then((result) => {
        //         store.setListUsersSearch(result);
        //         store.setNameUserSearch('');                
        //     }).catch((err) => {
        //         if (err === 403) {
        //             this.onLogoutApp();
        //         }
        //         if (err === 404) {
        //             store.clearListUsersSearch();
        //         }
        //     })
        // } else {
        //     store.setNameUserSearch('');
        // }
    }

    render() {
        return (
            <div className="header-left">
                <div className="name-user">
                    {"Smilo - " + this.props.auth.displayName}
                </div>
                <div className="search">
                    <div className="input-search">
                        <input/>
                    </div>
                    <div className="action-search">
                        <button>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({firebase: { auth } }) => ({ auth }))
)(withRouter(HeaderLeft))

