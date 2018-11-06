import {manageUsersConstant} from '../constants/manageUsersConstant.js';

const actionUpdateListUser = (payload) => ({
    type: manageUsersConstant.UPDATE_LISTUSERS,
    payload: {
        listUsers: payload.listUsers
    }
});

export const manageUsersAction = {
    actionUpdateListUser
}
