import {messageConstant} from '../constants/messageConstant';

const initalState = {
    message: '',
    listMessages: []
}

export default function messageReducer(state=initalState, actions){
    switch(actions.type){
        case messageConstant.SET_MESSAGE:
            return{
                ...state,
                message: actions.payload.message
            };
        case messageConstant.SET_LISTMESSAGES:
            return {
                ...state,
                listMessages: actions.payload.listMessages
            }
        default:
            return state;
    }   
}
