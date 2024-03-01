import {
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGOUT,
    USER_LIST_FAILURE,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS
} from "../constants/adminConstants"

const adminLoginReducer = (state = {}, action) => {
    try {
        switch (action.type) {
            case ADMIN_LOGIN_REQUEST:
                return {
                    loading: true
                }
            case ADMIN_LOGIN_SUCCESS:
                return {
                    loading: false,
                    adminInfo: action.payload
                }
            case ADMIN_LOGIN_FAIL:
                return {
                    loading: false,
                    error: action.payload
                }
            case ADMIN_LOGOUT:
                return {}
            default:
                return state;
        }
    } catch (error) {
        console.log(error)
    }
}
const userListReducer = (state = {}, action) => {
    try {
        switch (action.type) {
            case USER_LIST_REQUEST:
                return {
                    loading: true
                }
            case USER_LIST_SUCCESS:
                return {
                    loading: false,
                    users: action.payload
                }
            case USER_LIST_FAILURE:
                return {
                    loading: false,
                    error: action.payload
                }
            case ADMIN_LOGOUT:
                return {}
            default:
                return state;
        }
    } catch (error) {
        console.log(error)
    }
}

export { adminLoginReducer, userListReducer };