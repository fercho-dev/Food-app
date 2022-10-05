import { FETCH_RECIPES, SEARCH_RECIPES, FETCH_DIETS, SORT } from '../actions'

const initialState = {
    recipes: [],
    filteredRecipes: [],
    diets: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload
            }
        case SEARCH_RECIPES:
            return {
                ...state,
                filteredRecipes: action.payload
            }
        case FETCH_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case SORT:
            let orderedRecipes = [...state.recipes]
            switch(action.payload) {
                case 'ascendent':
                    orderedRecipes.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (b.name < a.name) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                case 'descendent':
                    orderedRecipes.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                default:
                    break;
            }
            
            return {
                ...state,
                filteredRecipes: orderedRecipes
            }
        default:
            return state
    }
}