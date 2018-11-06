import React from 'react';
import { withRouter } from "react-router-dom"
import '../../../styles/homepage/component-in-home/HeaderLeft.css';

class HeaderLeft extends React.Component {
    constructor(props) {
        super(props);
        // this.handleSearch = this.handleSearch.bind(this);
    }

    // handleSearch() {
    //     const { store } = this.props;
    //     if (store.getNameUserSearch && store.getNameUserSearch.trim().length > 0) {
    //         store.setShowComponentSearch(true);
    //         store.searchNameUserChat().then((result) => {
    //             store.setListUsersSearch(result);
    //             store.setNameUserSearch('');                
    //         }).catch((err) => {
    //             if (err === 403) {
    //                 this.onLogoutApp();
    //             }
    //             if (err === 404) {
    //                 store.clearListUsersSearch();
    //             }
    //         })
    //     } else {
    //         store.setNameUserSearch('');
    //     }
    // }

    render() {
        console.log("header left");
        return (
            <div className="header-left">
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

export default withRouter(HeaderLeft);
