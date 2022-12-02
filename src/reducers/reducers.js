import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

function visibilityFilter(state = '', action) { //Every time an action is dispatched, this reducer will be called, and it’s responsible for addressing the action or not
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default: // A reducer must always return a state, even if there have been no changes — in which case, the reducer must accept and return the same, existing state
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

function moviesApp(state = {}, action) { //third function in our reducers file is a combined reducer, which groups all the reducers together and only passes them the state they’re concerned with
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action)
    }
}


export default moviesApp;