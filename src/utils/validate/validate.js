export const required = (value) => {
    if(!value){
        return "Поле обязательное для заполнения";
    }
    else{
        return undefined;
    }
}

export const maxLengthThunk = (length) => (value) => {
    debugger;
    if(value && value.length > length){
        return `Значение не может быть более ${length} символов`;
    }
    else{
        return undefined;
    }
}