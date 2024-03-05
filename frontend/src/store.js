import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userProfileReducer, userRegisterReducer } from './reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from './reducers/noteReducer';
import { adminLoginReducer, editUserReducer, userAddReducer, userDeleteReducer, userListReducer } from './reducers/adminReducer';

const userInfoFromStorrage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")) : null;
const adminInfoFromStorrage = localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo")) : null;
const initialState = {
    userLogin: { userInfo: userInfoFromStorrage },
    adminLogin: { adminInfo: adminInfoFromStorrage },
}

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    updateUser: userProfileReducer,

    adminLogin: adminLoginReducer,
    getUserList: userListReducer,
    deleteUser: userDeleteReducer,
    editUser: editUserReducer,
    addUser: userAddReducer
})

const middleware = [thunk, logger];

const store = legacy_createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;