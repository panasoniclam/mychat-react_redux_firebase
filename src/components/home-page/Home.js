import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class Home extends Component{
    render(){
        console.log("1234");
        return(
            <div>
                Home
            </div>
        );
    }
}

export default withRouter(Home)
