import axios from 'axios'

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const SORT = 'SORT';

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

export function sort(order) {
    return {
        type: SORT,
        payload: order
    }
}