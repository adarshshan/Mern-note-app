import axios from "axios";
import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS } from "../constants/noteConstants";


const listNotes = () => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
        const { data } = await axios.get('/api/notes', config);
        dispatch({ type: NOTES_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: NOTES_LIST_FAIL, payload: message });
        console.log(error);
    }
}
const createNote = (title, category, content) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_CREATE_REQUEST })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
        const { data } = axios.post('/api/notes/create', { title, category, content }, config);
        if (data) dispatch({ type: NOTES_CREATE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: NOTES_CREATE_FAIL, payload: message })
        console.log(error)
    }
}
const deleteNote = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_DELETE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/notes/${id}`, config);
        dispatch({ type: NOTES_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: NOTES_DELETE_FAIL, payload: message });
        console.log(error);
    }
}

export {
    listNotes,
    deleteNote,
    createNote
}