import * as axios from 'axios';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "4a98ea3b-9669-42b4-a9d0-6c7f3197bb61"
    }
});

export const userAPI = {
    getUsers(d, pageSize){
        return instance.get(`users?page=${d}&count=${pageSize}`).then(response => {
            return response.data
        });
    },
    following(userId){
        return instance.post(`follow/${userId}`);
    },
    unfollowing(userId){
        return instance.delete(`follow/${userId}`);
    },
    headerReg(){
        return instance.get(`auth/me`);
    },
    setProfile(userId){
        return instance.get(`profile/${userId}`);
    },
    setStatus(userId){
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status});
    },
    login(email, password, rememberMe, captcha){
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout(){
        return instance.delete(`auth/login`);
    },
    savePhoto(photos){
        const formData = new FormData();
        formData.append('image', photos);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(dataForm){
        return instance.put(`profile`, dataForm);
    },
    getCaptcha(){
        return instance.get(`security/get-captcha-url`);
    }
}