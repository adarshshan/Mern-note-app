import axios from "axios";
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, USER_LIST_FAILURE, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/adminConstants";



const LoginAdmin = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post('/api/admin/login', { email, password }, config);
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
        console.log(data);
        if (data) dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message;
        dispatch({ type: USER_LIST_FAILURE, payload: message });
    }
}

export { LoginAdmin,getUserList }