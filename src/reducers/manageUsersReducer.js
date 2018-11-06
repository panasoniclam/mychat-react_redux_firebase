import {manageUsersConstant} from '../constants/manageUsersConstant.js';

const initalState = {
    listUsers: []
}

export default function manageUsersReducer(state=initalState, actions){
    switch(actions.type){
        case manageUsersConstant.UPDATE_LISTUSERS:
            return{
                ...state,
                listUsers: actions.payload.listUsers,
            };
        default:
            return state;
    }   
}
