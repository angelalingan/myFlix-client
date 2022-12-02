export const SET_MOVIES = 'SET_MOVIES'; //SET_MOVIES initializes the movies list with movies
export const SET_FILTER = 'SET_FILTER'; //SET_FILTER sets the filter to filter your movies list

export function setMovies(value) { //The reason for exporting functions is you’ll be able to call them from wherever you want to perform said actions
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}