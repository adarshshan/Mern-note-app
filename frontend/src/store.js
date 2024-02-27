import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const userInfoFromStorrage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const initialState = {
    userLogin: { userInfo: userInfoFromStorrage },
}
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

const middleware = [thunk];

const store = legacy_createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;