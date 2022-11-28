export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export function setMovies(value) {
    return {
        type: SET_MOVIES,
        value,
    };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setUser(value) {
    return { type: SET_USER, value };
}

export function updateUser(value) {
    return { type: UPDATE_USER, value };
}

export function deleteUser(value) {
    return { type: DELETE_USER, value };
}

export function setFavorites(value) {
    return { type: SET_FAVORITES, value };
}

export function addFavorite(value) {
    return { type: ADD_FAVORITE, value };
}

export function removeFavorite(value) {
    return { type: REMOVE_FAVORITE, value };
}