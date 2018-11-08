import {messageConstant} from '../constants/messageConstant.js';

const actionSetMessage = (payload) => ({
    type: messageConstant.SET_MESSAGE,
    payload: {
        message: payload.message
    }
});

const actionSetListMessages = (payload) => ({
    type: messageConstant.SET_LISTMESSAGES,
    payload: {
        listMessages: payload.listMessages
    }
})
export const messageAction = {
    actionSetMessage,
    actionSetListMessages
}
