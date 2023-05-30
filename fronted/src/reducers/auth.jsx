import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    LOGOUT,
    AUTHENTICATED_SUCCESS,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    PROFILE_CREATE_SUCCES,
    PROFILE_CREATE_FAIL,
    PROFILE_LOADED_SUCCES,
    PROFILE_LOADED_FAIL,
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    profile: localStorage.getItem('profile'),
    error: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                error: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                error: null
            }
        case USER_LOADED_SUCCESS:
                return {
                ...state,
                user: payload,
                error: null
            }
        case PROFILE_LOADED_SUCCES:
        case PROFILE_CREATE_SUCCES:
            localStorage.setItem('profile', true);
            return{
                ...state,
                profile: true,
                error: null
            }
        case PROFILE_LOADED_FAIL:
        case PROFILE_CREATE_FAIL:
            localStorage.removeItem('profile')
            return{
                ...state,
                profile: false
            }
       

        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
                profile: null
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('profile');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                profile: null,
                error: action.payload // Agrega esta línea
            };
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('profile');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                profile:null,
                error: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};