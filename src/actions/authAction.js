import firebase from '@firebase/app';
import '@firebase/auth';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    NOT_LOGIN_YET
} from './types'


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
}

export const alreadyLogin = (user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
}

export const notLoginYet = () => {
    return {
        type: NOT_LOGIN_YET
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
        .then( res => {
            dispatch({ type: LOGOUT_USER })
        });
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
        //firebase is an object that has method named auth,
        // auth receive no parameter that is executed that return an object that has a signInWithEmailAndPassword method
        // signInWithEmailAndPassword method return a promise object with method (.then and .catch)
        .then(user => {
            loginUserSuccess(dispatch, user);
        })
        //dispatch is a function
        .catch((error) => {
            console.log(error);

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user);
            })
            .catch(() => loginUserFail(dispatch));
        });
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL })
}

