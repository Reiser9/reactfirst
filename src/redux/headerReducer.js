import {setUserData} from '../redux/auth-reducer';
import {userAPI} from '../api/api';

export const headerRegThunk = () => async (dispatch) => {
    const response = await userAPI.headerReg()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setUserData(id, email, login, true));
    }
}