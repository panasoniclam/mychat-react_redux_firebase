import {channelConstant} from '../constants/channelConstant';

const initalState = {
    activeChannel: '',
    idStarChannel: ''
}

export default function manageUsersReducer(state=initalState, actions){
    switch(actions.type){
        case channelConstant.SET_ACTIVE_CHANNEL:
            return{
                ...state,
                activeChannel: actions.payload.activeChannel,
            };
        case channelConstant.SET_STAR_CHANNEL:
            return{
                ...state,
                idStarChannel: actions.payload.idStarChannel
            };
        default:
            return state;
    }   
}
