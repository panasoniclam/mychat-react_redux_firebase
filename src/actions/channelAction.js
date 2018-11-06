import {channelConstant} from '../constants/channelConstant';

const actionsSetActiveChannel = (payload) => ({
    type: channelConstant.SET_ACTIVE_CHANNEL,
    payload: {
        activeChannel: payload.activeChannel
    }
});

export const channelAction = {
    actionsSetActiveChannel
}
