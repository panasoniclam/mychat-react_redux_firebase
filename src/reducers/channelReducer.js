import {channelConstant} from '../constants/channelConstant';

const initalState = {
    activeChannel: '',
    idStarChannels: []
}

export default function manageUsersReducer(state=initalState, actions){
    switch(actions.type){
        case channelConstant.SET_ACTIVE_CHANNEL:
            return{
                ...state,
                activeChannel: actions.payload.activeChannel,
            };
        default:
            return state;
    }   
}
