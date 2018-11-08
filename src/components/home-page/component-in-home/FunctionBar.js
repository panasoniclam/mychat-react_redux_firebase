import React, {Component} from 'react';
import '../../../styles/homepage/component-in-home/FunctionBar.css';
import imageUpload from '../../../resources/icons8-picture-50.png';
class FunctionBar extends Component{

    handlerUploadImage = () => {

    }

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render(){
        return(
            <div className="container-function-bar">
                <div className="button-upimage">
                    <img src={imageUpload} onClick={this.handlerUploadImage} alt=""></img>
                </div>
            </div>
        );
    }
}

export default FunctionBar;
