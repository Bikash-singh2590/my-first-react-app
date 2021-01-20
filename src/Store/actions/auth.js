import * as actionType from './actionTypes';


export const authStart = () =>{
    return{
        type:actionType.AUTH_START
    };
};

export const authSuccess = (authData) =>{
    return{
        type:actionType.AUTH_SUCCESS,
        authData:authData
    };
};

export const authFail = () =>{
    return{
        type:actionType.AUTH_FAIL
    };
};


export const auth = ( email,password)=>{
    return dispatch =>{
        dispatch(authStart());

    };
}