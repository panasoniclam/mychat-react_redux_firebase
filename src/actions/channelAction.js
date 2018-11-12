import {channelConstant} from '../constants/channelConstant';

const actionsSetActiveChannel = (payload) => ({
    type: channelConstant.SET_ACTIVE_CHANNEL,
    payload: {
        activeChannel: payload.activeChannel
    }
});

const actionSetStarChannel = (payload) => ({
    type: channelConstant.SET_STAR_CHANNEL,
    payload: {
        idStarChannel: payload.idStarChannel
    }    
})

export const channelAction = {
    actionsSetActiveChannel,
    actionSetStarChannel
}
