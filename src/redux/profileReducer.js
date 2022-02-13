import {userAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

let initialState = {
    profilePagePosts: [
        {id: 1, message: "Привет, это мой первый пост", likes: 12},
        {id: 2, message: "Сегодня был убит живот", likes: 95},
        {id: 3, message: "Рубль упал у мужика на пол", likes: 35}
    ],
    profile: {},
    status: ''
}

// Передаем начальный state, т.к redux при первом action не получает state и падает ошибка
const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case 'addPost':
            let newPost = {
                id: 4,
                message: action.val,
                likes: 0
            }
            return {
                ...state,
                profilePagePosts: [...state.profilePagePosts, newPost]
            };
        case 'setUserProfile':
            return {
                ...state,
                profile: action.profile
            };
        case 'setStatus':
            return {
                ...state,
                status: action.status
            };
        case 'updateStatus':
            return {
                ...state,
                status: action.status
            };
        case 'savePhoto':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        case 'saveProfile':
            return {
                ...state,
                profile: action.profileInfo
            };
        default:
            return state;
    }
}

export const addPostActionCreator = (val) => {
    return {
        type: 'addPost',
        val
    }
}

export const setUserProfile = (profile) => {
    return {
        type: 'setUserProfile',
        profile
    }
}

export const setStatus = (status) => {
    return {
        type: 'setStatus',
        status
    }
}

export const updateStatus = (status) => {
    return {
        type: 'updateStatus',
        status
    }
}

export const savePhoto = (photos) => {
    return {
        type: 'savePhoto',
        photos
    }
}

export const saveProfile = (profileInfo) => {
    return{
        type: 'saveProfile',
        profileInfo
    }
}

export const setUserProfileThunk = (userId) => async (dispatch) => {
    const response = await userAPI.setProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const setStatusThunk = (userId) => async (dispatch) => {
    const response = await userAPI.setStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatusThunk = (status) => async (dispatch) => {
    const response = await userAPI.updateStatus(status);
    if(response.data.resultCode === 0){
        dispatch(setStatus(status));
    }
}

export const savePhotoThunk = (photos) => async (dispatch) => {
    const response = await userAPI.savePhoto(photos);
    if(response.data.resultCode === 0){
        dispatch(savePhoto(response.data.data.photos));
    }
}

export const saveProfileThunk = (profileInfo) => async (dispatch) => {
    const response = await userAPI.saveProfile(profileInfo);
    if(response.data.resultCode === 0){
        dispatch(saveProfile(profileInfo));
    }
    else{
        dispatch(stopSubmit('profileInfo', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;