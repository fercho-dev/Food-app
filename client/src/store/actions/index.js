import axios from 'axios'

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const FETCH_DIETS = 'FETCH_DIETS';
export const SORT = 'SORT';
export const FILTER = 'FILTER';
export const COMMUNITY = 'COMMUNITY';
export const RELOAD_RECIPES = 'RELOAD_RECIPES';

export function fetchRecipes() {
    return function(dispatch) {
        axios.get('http://localhost:3001/recipes')
        .then((recipes) => {
            dispatch({
                type: FETCH_RECIPES,
                payload: recipes.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function searchRecipes(search) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/recipes/?search=${search}`)
        .then((recipes) => {
            dispatch({
                type: SEARCH_RECIPES,
                payload: recipes.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function fetchDiets() {
    return function(dispatch) {
        axios.get('http://localhost:3001/diets')
        .then((diets) => {
            dispatch({
                type: FETCH_DIETS,
                payload: diets.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function sort(order) {
    return {
        type: SORT,
        payload: order
    }
}

export function filter(filter) {
    return {
        type: FILTER,
        payload: filter
    }
}

export function communityRecipes() {
    return function(dispatch) {
        axios.get('http://localhost:3001/recipes/db')
        .then((recipes) => {
            dispatch({
                type: COMMUNITY,
                payload: recipes.data
            })
        })
        .catch((error) => {
            alert(`Ups, we couldnt get database recipes\n${error}`);
            window.location.href = "/recipes";
        })
    }
}

export function reloadRecipes() {
    return {
        type: RELOAD_RECIPES,
        payload: null
    }
}