import { stopSubmit } from 'redux-form';
import {userAPI} from '../api/api';
import {headerRegThunk} from './headerReducer';

let initialState = {
    userId: "",
    email: "",
    login: "",
    isAuth: false,
    captcha: ""
}

// Передаем начальный state, т.к redux при первом action не получает state и падает ошибка
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case "setUserData":
            return{
                ...state,
                ...action.data,
                isAuth: action.data.isAuth
            };
        case "getCaptcha":
            return{
                ...state,
                captcha: action.captcha
            };
        default:
            return state;
    }
}

export const setUserData = (userId, email, login, isAuth) => {
    return {
        type: 'setUserData',
        data: {userId, email, login, isAuth}
    }
}

export const getCaptcha = (captcha) => {
    return {
        type: 'getCaptcha',
        captcha
    }
}

export const loginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await userAPI.login(email, password, rememberMe, captcha);
    if(response.data.resultCode === 0){
        dispatch(headerRegThunk());
    }
    else{
        if(response.data.resultCode === 10){
            dispatch(getCaptchaThunk());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Какая-то ошибка :/';
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logoutThunk = () => async (dispatch) => {
    const response = await userAPI.logout();
    if(response.data.resultCode === 0){
        dispatch(setUserData(null, null, null, false));
    }
}

export const getCaptchaThunk = () => async (dispatch) => {
    const response = await userAPI.getCaptcha();
    dispatch(getCaptcha(response.data.url));
}

export default authReducer;