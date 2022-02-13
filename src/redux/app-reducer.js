import {headerRegThunk} from './headerReducer';

let initialState = {
    initialized: false
}

// Передаем начальный state, т.к redux при первом action не получает state и падает ошибка
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case "setInitialized":
            return{
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const setInitialized = () => {
    return {
        type: 'setInitialized'
    }
}

export const initializedApp = () => (dispatch) => {
    let promise = dispatch(headerRegThunk());
    //let some = dispatch(someThunk());
    // Если бы было бы несколько диспатчей, то заворачиваем в массив все
    Promise.all([promise/*,some*/]).then(() => {
        dispatch(setInitialized());
    });
}

export default authReducer;