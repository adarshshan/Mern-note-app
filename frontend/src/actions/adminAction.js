import axios from "axios";
import {
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    USER_DELETE_FAILURE,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_EDIT_FAILURE,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_LIST_FAILURE,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS
} from "../constants/adminConstants";
import { NOTES_DELETE_SUCCESS } from "../constants/noteConstants";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";



const LoginAdmin = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post('/api/admin/login', { email, password }, config);
        console.log('admin data is ');
        console.log(data);
        if (data) {
            dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data })
            localStorage.setItem('adminInfo', JSON.stringify(data));
        }
    } catch (error) {
        console.log(error);
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;
        dispatch({ type: ADMIN_LOGIN_FAIL, payload: message });
    }
}
const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })
        const { adminLogin: { adminInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${adminInfo?.token}`
            }
        }
        const { data } = await axios.get('/api/admin/user-list', config);
        console.log('hello')
        console.log(data);
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;
        dispatch({ type: USER_LIST_FAILURE, payload: message });
    }
}
const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        const { adminLogin: { adminInfo } } = getState();
        console.log(adminInfo);
        const config = {
            headers: {
                Authorization: `Bearer ${adminInfo?.token}`
            }
        }
        const { data } = await axios.delete(`/api/admin/${id}`, config);
        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;
        dispatch({ type: USER_DELETE_FAILURE, payload: message })
    }
}
const updateUserDetails = ({ id, name, email, password, pic }) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_EDIT_REQUEST });
        const { adminLogin: { adminInfo } } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminInfo?.token}`
            }
        }
        const { data } = await axios.put(`/api/admin/${id}`, { name, email, password, pic }, config);
        dispatch({ type: USER_EDIT_SUCCESS, payload: data })

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;
        dispatch({ type: USER_EDIT_FAILURE, payload: message });
    }
}

export {
    LoginAdmin,
    getUserList,
    deleteUser,
    updateUserDetails
}