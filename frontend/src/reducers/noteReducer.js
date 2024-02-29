import {
    NOTES_CREATE_FAIL,
    NOTES_CREATE_REQUEST,
    NOTES_CREATE_SUCCESS,
    NOTES_DELETE_FAIL,
    NOTES_DELETE_REQUEST,
    NOTES_DELETE_SUCCESS,
    NOTES_LIST_FAIL,
    NOTES_LIST_REQUEST,
    NOTES_LIST_SUCCESS
} from "../constants/noteConstants";


const noteListReducer = (state = { note: [] }, action) => {
    try {
        switch (action.type) {
            case NOTES_LIST_REQUEST:
                return {
                    loading: true
                }
            case NOTES_LIST_SUCCESS:
                return {
                    loading: false,
                    notes: action.payload
                }
            case NOTES_LIST_FAIL:
                return {
                    loading: false,
                    error: action.payload
                }
            default:
                return state;
        }
    } catch (error) {
        console.log(error)
    }
}
const noteDeleteReducer = (state = {}, action) => {
    try {
        switch (action.type) {
            case NOTES_DELETE_REQUEST:
                return {
                    loading: true
                }
            case NOTES_DELETE_SUCCESS:
                return {
                    loading: false
                }
            case NOTES_DELETE_FAIL:
                return {
                    loading: false,
                    error: action.payload
                }
            default:
                return state;
        }
    } catch (error) {
        console.log(error)
    }
}
const noteCreateReducer = (state = {}, action) => {
    try {
        switch (action.type) {
            case NOTES_CREATE_REQUEST:
                return {
                    loading: true
                }
            case NOTES_CREATE_SUCCESS:
                return {
                    loading: false,
                    success: true
                }
            case NOTES_CREATE_FAIL:
                return {
                    loading: false,
                    error: action.payload
                }
            default:
                return state;
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    noteListReducer,
    noteDeleteReducer,
    noteCreateReducer
}