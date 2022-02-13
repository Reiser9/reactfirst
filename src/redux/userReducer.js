import {userAPI} from '../api/api';

let initialState = {
    users: [],
    pageSize: 10,
    totalUserCount: 0,
    currentPage: 1,
    inProgress: false,
    followingProgress: []
}

const followUnfollowFlow = (item, itemId, objPropName, newObjProp) => {
    return item.map(u => {
        if (u[objPropName] === itemId) {
            return {
                ...u,
                ...newObjProp
            };
        }
        return u;
    })
}

const followUnfollowThunk = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(followingProgressAC(true, id));
    const response = await apiMethod(id);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(followingProgressAC(false, id));
}

// Передаем начальный state, т.к redux при первом action не получает state и падает ошибка
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "follow":
            return {
                ...state,
                users: followUnfollowFlow(state.users, action.userId, "id", {followed: true})
            };
        case "unfollow":
            return {
                ...state,
                users: followUnfollowFlow(state.users, action.userId, "id", {followed: false})
            };
        case "setUsers":
            return {
                ...state,
                users: action.users
            };
        case "setCurrentPage":
            return {
                ...state,
                currentPage: action.currentPage
            };
        case "setTotalUser":
            return {
                ...state,
                totalUserCount: action.totalUserCount
            };
        case "toggleInProgress":
            return {
                ...state,
                inProgress: action.inProgress
            };
        case "followingProgress":
            return {
                ...state,
                followingProgress: action.progress ? [...state.followingProgress, action.userId] :
                    state.followingProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

export const follow = (userId) => {
    return {
        type: 'follow',
        userId
    }
}

export const unfollow = (userId) => {
    return {
        type: 'unfollow',
        userId
    }
}

export const setUsers = (users) => {
    return {
        type: 'setUsers',
        users
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: 'setCurrentPage',
        currentPage
    }
}

export const setTotalUser = (totalUserCount) => {
    return {
        type: 'setTotalUser',
        totalUserCount
    }
}

export const toggleInProgress = (inProgress) => {
    return {
        type: 'toggleInProgress',
        inProgress
    }
}

export const followingProgressAC = (progress, userId) => {
    return {
        type: 'followingProgress',
        progress,
        userId
    }
}

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleInProgress(true));
    const data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(toggleInProgress(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUser(data.totalCount));
}

export const getUsersPag = (currentPage) => async (dispatch) => {
    dispatch(setCurrentPage(currentPage));
}

export const unfollowThunk = (id) => async (dispatch) => {
    followUnfollowThunk(dispatch, id, userAPI.unfollowing.bind(userAPI), unfollow)
}

export const followThunk = (id) => async (dispatch) => {
    followUnfollowThunk(dispatch, id, userAPI.following.bind(userAPI), follow)
}

export default userReducer;